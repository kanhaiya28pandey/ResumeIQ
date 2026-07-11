from fastapi import APIRouter, Depends

from app.auth_middleware import get_current_user
from app.database import scans_collection

router = APIRouter(tags=["history"])


@router.get("/history")
def get_history(user_id: str = Depends(get_current_user)):
    scans = list(scans_collection.find({"userId": user_id}).sort("createdAt", -1))

    for scan in scans:
        scan["_id"] = str(scan["_id"])

    return scans