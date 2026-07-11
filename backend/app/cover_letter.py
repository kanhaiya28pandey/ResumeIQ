from fastapi import APIRouter, Depends, UploadFile, File, Form

from app.auth_middleware import get_current_user
from app.resume_parser import extract_resume_text
from app.ai_service import generate_cover_letter

router = APIRouter(tags=["cover-letter"])


@router.post("/cover-letter")
async def create_cover_letter(
    resume: UploadFile = File(...),
    jobDescription: str = Form(...),
    user_id: str = Depends(get_current_user),
):
    file_bytes = await resume.read()
    resume_text = extract_resume_text(resume.filename, file_bytes)

    letter = generate_cover_letter(resume_text, jobDescription)

    return {"coverLetter": letter}