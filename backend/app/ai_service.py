import os
import json
from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def generate_resume_suggestions(resume_text: str, jd_text: str) -> list:
    prompt = f"""
You are a resume reviewer. Compare this resume with the job description below.
Give exactly 3 to 5 short, specific, actionable suggestions to improve the resume
for this particular job. Return ONLY a JSON array of strings, nothing else.

RESUME:
{resume_text}

JOB DESCRIPTION:
{jd_text}
"""
    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents=prompt,
    )
    text = response.text.strip()
    text = text.replace("```json", "").replace("```", "").strip()

    try:
        suggestions = json.loads(text)
    except json.JSONDecodeError:
        suggestions = [line.strip("-• ") for line in text.split("\n") if line.strip()]

    return suggestions[:5]


def generate_cover_letter(resume_text: str, jd_text: str) -> str:
    prompt = f"""
Write a professional cover letter based on this resume and job description.
Keep it under 300 words, natural tone, no placeholders like [Company Name] left unfilled
if the job description mentions the actual company name.

RESUME:
{resume_text}

JOB DESCRIPTION:
{jd_text}
"""
    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents=prompt,
    )
    return response.text.strip()