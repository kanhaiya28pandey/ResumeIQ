from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from app.auth_middleware import get_current_user
from app.database import scans_collection

router = APIRouter(tags=["scan"])

@router.get("/scan/{scan_id}")
def get_scan(scan_id: str,
             user_id: str = Depends(get_current_user)):
    scan = scans_collection.find_one({
        "_id": ObjectId(scan_id),
        "userId": user_id
    })

    if not scan:
        raise HTTPException(404, "Scan not found")
    scan["id"] = str(scan["_id"])
    del scan["_id"]
    if scan.get("createdAt"):
        scan["createdAt"] = scan["createdAt"].isoformat()

    return scan