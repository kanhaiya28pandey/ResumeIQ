from fastapi import APIRouter, Depends
from collections import Counter

from app.auth_middleware import get_current_user
from app.database import scans_collection

router = APIRouter(tags=["dashboard"])


@router.get("/dashboard")
def get_dashboard(user_id: str = Depends(get_current_user)):
    scans = list(scans_collection.find({"userId": user_id}).sort("createdAt", -1))

    if not scans:
        return {
            "totalScans": 0,
            "averageMatchScore": 0,
            "highestMatchScore": 0,
            "averageAtsScore": 0,
            "recentScans": [],
            "scoreTrend": [],
            "commonMissingSkills": [],
        }

    match_scores = [scan["matchScore"] for scan in scans]
    ats_scores = [scan["atsScore"] for scan in scans]

    # counting how often each missing skill shows up across all scans
    all_missing_skills = []
    for scan in scans:
        all_missing_skills.extend(scan.get("missingSkills", []))
    top_missing = Counter(all_missing_skills).most_common(5)

    trend = [
        {"date": scan["createdAt"], "matchScore": scan["matchScore"]}
        for scan in reversed(scans)
    ]

    for scan in scans:
        scan["_id"] = str(scan["_id"])

    return {
        "totalScans": len(scans),
        "averageMatchScore": round(sum(match_scores) / len(match_scores), 2),
        "highestMatchScore": max(match_scores),
        "averageAtsScore": round(sum(ats_scores) / len(ats_scores), 2),
        "recentScans": scans[:5],
        "scoreTrend": trend,
        "commonMissingSkills": [{"skill": skill, "count": count} for skill, count in top_missing],
    }