from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, Depends
from app.auth_middleware import get_current_user
from app.database import users_collection
from app.models import (
    SignupRequest,
    LoginRequest,
    ForgotPasswordRequest,
    VerifyOtpRequest,
    ResetPasswordRequest,
)
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
        raise HTTPException(status_code=400, detail="An account with this email already exists")

    user_doc = {
        "name": data.name,
        "email": data.email,
        "passwordHash": hash_password(data.password),
        "createdAt": datetime.now(timezone.utc),
    }
    result = users_collection.insert_one(user_doc)

    token = create_access_token(str(result.inserted_id))
    return {"token": token, "email": data.email, "name": data.name}

@router.post("/login")
def login(data: LoginRequest):
    user = users_collection.find_one({"email": data.email})

    if not user or not verify_password(data.password, user["passwordHash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(str(user["_id"]))
    return {"token": token, "email": user["email"], "name": user.get("name", "")}


@router.post("/forgot-password")
def forgot_password(data: ForgotPasswordRequest):
    user = users_collection.find_one({"email": data.email})

    # even if user doesn't exist, we return the same success message
    # this way someone can't use this endpoint to check which emails are registered
    if not user:
        return {"message": "If that email exists, an OTP has been sent"}

    otp = generate_otp()
    otp_expiry = datetime.now(timezone.utc).timestamp() + (10 * 60)  # valid for 10 minutes

    users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {"otpCode": otp, "otpExpiry": otp_expiry}},
    )

    send_otp_email(data.email, otp)
    return {"message": "If that email exists, an OTP has been sent"}


@router.post("/verify-otp")
def verify_otp(data: VerifyOtpRequest):
    user = users_collection.find_one({"email": data.email})
    if not user or "otpCode" not in user:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    now = datetime.now(timezone.utc).timestamp()
    if user["otpCode"] != data.otp or now > user["otpExpiry"]:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    # otp used successfully, remove it so it can't be reused
    users_collection.update_one(
        {"_id": user["_id"]},
        {"$unset": {"otpCode": "", "otpExpiry": ""}},
    )

    reset_token = create_reset_token(str(user["_id"]))
    return {"resetToken": reset_token}


@router.post("/reset-password")
def reset_password(data: ResetPasswordRequest):
    payload = decode_token(data.resetToken)

    # reject if token is invalid/expired, or if it's not actually a reset token
    # (this stops someone from reusing a normal login token here)
    if not payload or payload.get("type") != "reset":
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")

    if len(data.newPassword) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters long")

    user = users_collection.find_one({"_id": _to_object_id(payload["sub"])})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # new password should not be the same as the old one
    if verify_password(data.newPassword, user["passwordHash"]):
        raise HTTPException(status_code=400, detail="New password cannot be the same as old password")

    users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {"passwordHash": hash_password(data.newPassword)}},
    )
    return {"message": "Password reset successful"}


def _to_object_id(id_str: str):
    # small helper so we don't import ObjectId in every function above
    from bson import ObjectId
    return ObjectId(id_str)

@router.get("/me")
def get_me(user_id: str = Depends(get_current_user)):
    user = users_collection.find_one({"_id": _to_object_id(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"name": user.get("name", ""), "email": user["email"], "createdAt": user["createdAt"]}