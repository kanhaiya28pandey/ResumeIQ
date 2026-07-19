from datetime import datetime, timezone
from fastapi import APIRouter, Depends, UploadFile, File, Form
from app.auth_middleware import get_current_user
from app.database import scans_collection
from app.resume_parser import extract_resume_text
from app.matcher import calculate_match_score
from app.ats_score import calculate_ats_score
from app.ai_service import analyze_resume_ai
from app.resume_sections import analyze_resume_sections

router = APIRouter(tags=["analyze"])
def get_match_verdict(score: float) -> str:
    if score >= 90:
        return "Excellent Match"
    elif score >= 75:
        return "Good Match"
    elif score >= 50:
        return "Moderate Match"
    else:
        return "Poor Match"

@router.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    jobTitle: str = Form(...),
    jobDescription: str = Form(...),
    user_id: str = Depends(get_current_user),
):
    
    # Read Resume

    file_bytes = await resume.read()
    resume_text = extract_resume_text(
        resume.filename,
        file_bytes,
    )

    # Resume Matcher

    match_result = calculate_match_score(
        resume_text,
        jobDescription,
        jobTitle,
    )

    # Resume Sections

    sections = analyze_resume_sections(
        resume_text
    )

    # ATS Analysis

    ats_result = calculate_ats_score(
    resume_text,
    sections,
    match_result["matchedSkills"],
    match_result["missingSkills"],
)

    # AI Analysis

    ai_result = analyze_resume_ai(
        resume_text,
        jobDescription,
    )
    overall_verdict = get_match_verdict(
    match_result["matchScore"]
)
    # Save Scan

    scan_doc = {

        "userId": user_id,

        "jobTitle": jobTitle,

        "detectedDomain": match_result["detectedDomain"],

        "matchScore": match_result["matchScore"],
        "skillScore": match_result["skillScore"],
        "semanticScore": match_result["semanticScore"],
        "atsScore": ats_result["atsScore"],

        "matchedSkills": match_result["matchedSkills"],
        "missingSkills": match_result["missingSkills"],

        "criticalMissingSkills":
            match_result["criticalMissingSkills"],

        "supportingMissingSkills":
            match_result["supportingMissingSkills"],

        "matchedWeight":
            match_result["matchedWeight"],

        "totalWeight":
            match_result["totalWeight"],

        "sections": sections,

        "summary": ai_result["summary"],

        "strengths": ai_result["strengths"],

        "weaknesses": ai_result["weaknesses"],

        "experienceLevel":
            ai_result["experienceLevel"],

        "overallVerdict":
            overall_verdict,

        "improveSuggestions":
            ai_result["suggestions"],

        "atsGrade": ats_result["grade"],

        "atsBreakdown": ats_result["breakdown"],

        "createdAt": datetime.now(
            timezone.utc
        ),
    }

    result = scans_collection.insert_one(
        scan_doc
    )

    
    # Response
    return {

        "scanId": str(result.inserted_id),

        # Domain
        "detectedDomain":
            match_result["detectedDomain"],

        # Scores
        "matchScore":
            match_result["matchScore"],

        "skillScore":
            match_result["skillScore"],

        "semanticScore":
            match_result["semanticScore"],

        "atsScore":
            ats_result["atsScore"],

        "atsGrade":
            ats_result["grade"],

        "atsBreakdown":
        ats_result["breakdown"],
        # Skills
        "matchedSkills":
            match_result["matchedSkills"],

        "missingSkills":
            match_result["missingSkills"],

        "criticalMissingSkills":
            match_result["criticalMissingSkills"],

        "supportingMissingSkills":
            match_result["supportingMissingSkills"],

        "matchedSkillsCount":
            match_result["matchedSkillsCount"],

        "missingSkillsCount":
            match_result["missingSkillsCount"],

        "totalSkills":
            match_result["totalSkills"],

        "matchedWeight":
            match_result["matchedWeight"],

        "totalWeight":
            match_result["totalWeight"],

        "atsReasons":
            ats_result["reasons"],

        "sections":
        sorted(
            sections,
            key=lambda x: x["present"],
            reverse=True,
        ),

        "summary":
            ai_result["summary"],

        "strengths":
            ai_result["strengths"],

        "weaknesses":
            ai_result["weaknesses"],

        "experienceLevel":
            ai_result["experienceLevel"],

        "overallVerdict":
            overall_verdict,

        "improveSuggestions":
            ai_result["suggestions"],
    }