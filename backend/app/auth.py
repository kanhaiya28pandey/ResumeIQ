from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, Depends
from app.auth_middleware import get_current_user
from app.database import users_collection, scans_collection
from app.models import (SignupRequest, LoginRequest, ForgotPasswordRequest, VerifyOtpRequest, ResetPasswordRequest,)
from app.utils import (
    hash_password,
    verify_password,
    create_access_token,
    create_reset_token,
    decode_token,
    generate_otp,
    send_otp_email,
)

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup")
def signup(data: SignupRequest):
    existing_user = users_collection.find_one({"email": data.email})
    if existing_user:
        if not existing_user.get("isActive", True):
            users_collection.update_one(
                {"_id": existing_user["_id"]},
                {
                    "$set": {
                        "name": data.name,
                        "passwordHash": hash_password(data.password),
                        "isActive": True,
                        "deletedAt": None,
                    }
                },
            )

            token = create_access_token(str(existing_user["_id"]))

            return {
                "token": token,
                "email": data.email,
                "name": data.name,
            }

        raise HTTPException(
            status_code=400,
            detail="An account with this email already exists",
        )

    user_doc = {
    "name": data.name,
    "email": data.email,
    "passwordHash": hash_password(data.password),
    "createdAt": datetime.now(timezone.utc),
    "isActive": True,
    "deletedAt": None,
}
    result = users_collection.insert_one(user_doc)
    token = create_access_token(str(result.inserted_id))
    return {"token": token, "email": data.email, "name": data.name}

@router.post("/login")
def login(data: LoginRequest):
    user = users_collection.find_one({"email": data.email})
    if user and not user.get("isActive", True):
        raise HTTPException(
            status_code=403,
            detail="This account has been deactivated. Sign up again with the same email to restore it.",
        )
    if not user or not verify_password(data.password, user["passwordHash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(str(user["_id"]))
    return {"token": token, "email": user["email"], "name": user.get("name", "")}

@router.post("/forgot-password")
def forgot_password(data: ForgotPasswordRequest):
    user = users_collection.find_one({"email": data.email})

    if not user:
        raise HTTPException(
            status_code=404,
            detail="No account found with this email."
        )

    if not user.get("isActive", True):
        raise HTTPException(
            status_code=403,
            detail="This account has been deactivated."
        )
    otp = generate_otp()
    otp_expiry = datetime.now(timezone.utc).timestamp() + (10 * 60)
    users_collection.update_one(
        {"_id": user["_id"]},
        {
            "$set": {
                "otpCode": otp,
                "otpExpiry": otp_expiry,
            }
        },
    )

    send_otp_email(user["email"], otp)
    return {
        "message": "OTP sent successfully."
    }
@router.post("/change-password/request-otp")
def request_change_password_otp(
    user_id: str = Depends(get_current_user),
):
    user = users_collection.find_one(
        {"_id": _to_object_id(user_id)}
    )
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    if not user.get("isActive", True):
        raise HTTPException(
            status_code=403,
            detail="Account has been deactivated."
        )
    otp = generate_otp()
    otp_expiry = datetime.now(timezone.utc).timestamp() + (10 * 60)
    users_collection.update_one(
        {"_id": user["_id"]},
        {
            "$set": {
                "otpCode": otp,
                "otpExpiry": otp_expiry,
            }
        },
    )
    send_otp_email(user["email"], otp)
    return {
        "message": "OTP sent successfully.",
        "email": user["email"],
    }

@router.post("/verify-otp")
def verify_otp(data: VerifyOtpRequest):
    user = users_collection.find_one({"email": data.email})
    if user and not user.get("isActive", True):
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired OTP",
        )
    if not user or "otpCode" not in user:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
    now = datetime.now(timezone.utc).timestamp()
    if user["otpCode"] != data.otp or now > user["otpExpiry"]:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    users_collection.update_one(
        {"_id": user["_id"]},
        {"$unset": {"otpCode": "", "otpExpiry": ""}},
    )
    reset_token = create_reset_token(str(user["_id"]))
    return {"resetToken": reset_token}

@router.post("/reset-password")
def reset_password(data: ResetPasswordRequest):
    payload = decode_token(data.resetToken)

    if not payload or payload.get("type") != "reset":
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")

    if len(data.newPassword) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters long")
    user = users_collection.find_one({"_id": _to_object_id(payload["sub"])})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not user.get("isActive", True):
        raise HTTPException(
            status_code=403,
            detail="Account has been deactivated.",
        )

    if verify_password(data.newPassword, user["passwordHash"]):
        raise HTTPException(status_code=400, detail="New password cannot be the same as old password")

    users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {"passwordHash": hash_password(data.newPassword)}},
    )
    return {"message": "Password reset successful"}


def _to_object_id(id_str: str):
    from bson import ObjectId
    return ObjectId(id_str)

@router.get("/me")
def get_me(user_id: str = Depends(get_current_user)):
    user = users_collection.find_one(
        {"_id": _to_object_id(user_id)}
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )
    if not user.get("isActive", True):
        raise HTTPException(
            status_code=403,
            detail="Account has been deactivated.",
        )
    scans = list(
        scans_collection.find(
            {"userId": user_id}
        )
    )

    total_scans = len(scans)
    highest_match = (
        max(
            (
                scan.get("matchScore", 0)
                for scan in scans
            ),
            default=0,
        )
    )

    average_ats = (
        round(
            sum(
                scan.get("atsScore", 0)
                for scan in scans
            ) / total_scans,
            2,
        )
        if total_scans
        else 0
    )

    return {

        "name":
            user.get("name", ""),

        "email":
            user["email"],

        "createdAt":
            user["createdAt"],

        "totalScans":
            total_scans,

        "highestMatch":
            highest_match,

        "averageATS":
            average_ats,

    }

@router.post("/deactivate")
def deactivate_account(
    user_id: str = Depends(get_current_user),
):

    users_collection.update_one(
        {"_id": _to_object_id(user_id)},
        {
            "$set": {
                "isActive": False,
                "deletedAt": datetime.now(timezone.utc),
            }
        },
    )

    return {
        "message": "Account deactivated successfully."
    }