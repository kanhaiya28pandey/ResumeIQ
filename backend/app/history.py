from fastapi import APIRouter, Depends
from app.auth_middleware import get_current_user
from app.database import scans_collection

router = APIRouter(tags=["history"])


@router.get("/history")
def get_history(user_id: str = Depends(get_current_user)):
    scans = list(
        scans_collection.find(
            {"userId": user_id}
        ).sort("createdAt", -1)
    )
    print("Logged in user:", user_id)
    print("Total scans returned:", len(scans))
    history = []

    for scan in scans:
        print(scan["userId"], scan["jobTitle"])
        history.append({
    "id": str(scan["_id"]),

    "jobTitle": scan.get("jobTitle", ""),

    "detectedDomain": scan.get("detectedDomain", ""),

    "matchScore": scan.get("matchScore", 0),

    "skillScore": scan.get("skillScore", 0),

    "semanticScore": scan.get("semanticScore", 0),

    "atsScore": scan.get("atsScore", 0),

    "atsGrade": scan.get("atsGrade", "N/A"),

    "overallVerdict": scan.get("overallVerdict", ""),

    "experienceLevel": scan.get("experienceLevel", ""),

    "matchedSkills": scan.get("matchedSkills", []),

    "missingSkills": scan.get("missingSkills", []),

    "criticalMissingSkills": scan.get(
        "criticalMissingSkills",
        [],
    ),

    "supportingMissingSkills": scan.get(
        "supportingMissingSkills",
        [],
    ),

    "strengths": scan.get(
        "strengths",
        [],
    ),

    "weaknesses": scan.get(
        "weaknesses",
        [],
    ),

    "improveSuggestions": scan.get(
        "improveSuggestions",
        [],
    ),

    "summary": scan.get(
        "summary",
        "",
    ),

    "matchedSkillsCount": len(
        scan.get("matchedSkills", [])
    ),

    "missingSkillsCount": len(
        scan.get("missingSkills", [])
    ),

    "createdAt": (
    scan.get("createdAt").isoformat()
    if scan.get("createdAt")
    else None
),

})
    return history