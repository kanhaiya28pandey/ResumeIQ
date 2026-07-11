from datetime import datetime, timezone
from fastapi import APIRouter, Depends, UploadFile, File, Form

from app.auth_middleware import get_current_user
from app.database import scans_collection
from app.resume_parser import extract_resume_text
from app.matcher import calculate_match_score
from app.ats_score import calculate_ats_score
from app.ai_service import generate_resume_suggestions

router = APIRouter(tags=["analyze"])


@router.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    jobTitle: str = Form(...),
    jobDescription: str = Form(...),
    user_id: str = Depends(get_current_user),
):
    file_bytes = await resume.read()
    resume_text = extract_resume_text(resume.filename, file_bytes)

    match_result = calculate_match_score(resume_text, jobDescription)
    ats_result = calculate_ats_score(resume_text)
    suggestions = generate_resume_suggestions(resume_text, jobDescription)

    scan_doc = {
        "userId": user_id,
        "jobTitle": jobTitle,
        "matchScore": match_result["matchScore"],
        "atsScore": ats_result["atsScore"],
        "matchedSkills": match_result["matchedSkills"],
        "missingSkills": match_result["missingSkills"],
        "improveSuggestions": suggestions,
        "createdAt": datetime.now(timezone.utc),
    }
    result = scans_collection.insert_one(scan_doc)

    return {
        "scanId": str(result.inserted_id),
        "matchScore": match_result["matchScore"],
        "atsScore": ats_result["atsScore"],
        "matchedSkills": match_result["matchedSkills"],
        "missingSkills": match_result["missingSkills"],
        "improveSuggestions": suggestions,
    }