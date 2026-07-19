import json
import os
import time
from dotenv import load_dotenv
from google import genai

load_dotenv()
API_KEYS = [
    os.getenv("GEMINI_API_KEY_1"),
    os.getenv("GEMINI_API_KEY_2"),
    os.getenv("GEMINI_API_KEY_3"),
    os.getenv("GEMINI_API_KEY_4"),
    os.getenv("GEMINI_API_KEY_5"),
]

# Remove empty keys
API_KEYS = [key for key in API_KEYS if key]
if not API_KEYS:
    raise RuntimeError(
        "No Gemini API keys found. Please configure GEMINI_API_KEY_1 ... GEMINI_API_KEY_5"
    )

current_key_index = 0
KEY_COOLDOWN = 600 

blocked_keys = {}

# ResumeIQ AI Model Priority

MODELS = [
    "gemini-3.1-flash-lite",
    "gemini-3.5-flash",
    "gemini-flash-latest",
]

MAX_RETRIES = 2


def _generate_content(prompt: str) -> str:
    global current_key_index
    last_error = None
    total_keys = len(API_KEYS)
    for key_attempt in range(total_keys):
        key_index = (current_key_index + key_attempt) % total_keys
        if key_index in blocked_keys:
            if time.time() < blocked_keys[key_index]:
                print(f"Skipping API Key {key_index + 1} (Cooldown)")
                continue
            else:
                del blocked_keys[key_index]

        print("\n" + "=" * 60)
        print(f"Using API Key {key_index + 1}/{total_keys}")
        print("=" * 60)

        client = genai.Client(
            api_key=API_KEYS[key_index]
        )
        for model in MODELS:
            print(f"Trying Model: {model} | API Key #{key_index + 1}")
            for attempt in range(MAX_RETRIES):
                try:
                    response = client.models.generate_content(
                        model=model,
                        contents=prompt,
                    )
                    if not response.text:
                        raise Exception("Gemini returned an empty response.")
                    text = response.text.strip()
                    print(f"SUCCESS -> API Key {key_index + 1} | Model {model}")

                    current_key_index = key_index
                    blocked_keys.pop(key_index, None)
                    return text
                except Exception as e:
                    last_error = e
                    error_text = str(e).lower()
                    print(f"FAILED -> API Key {key_index + 1} | "f"Model {model} | Attempt {attempt + 1}")
                    print(e)
                    print("-" * 60)
                    if any(keyword in error_text for keyword in [
                        "429",
                        "quota",
                        "resource_exhausted",
                        "rate limit",
                        "too many requests",
                    ]):
                        print(
                            f"Quota reached. Blocking API Key {key_index + 1} "
                            f"for {KEY_COOLDOWN // 60} minutes."
                        )
                        blocked_keys[key_index] = (
                            time.time() + KEY_COOLDOWN
                        )
                        break
                    if attempt < MAX_RETRIES - 1:
                        time.sleep(2)
            else:
                continue
            break
    raise last_error


# JSON Cleaner
def _clean_json(text: str) -> dict:
    text = (
        text.replace("```json", "")
        .replace("```", "")
        .strip()
    )
    return json.loads(text)

# Resume AI Analysis

def analyze_resume_ai(
    resume_text: str,
    jd_text: str,
) -> dict:

    prompt = f"""
You are ResumeIQ's professional AI Resume Reviewer.

Compare the resume against the job description.

Return ONLY valid JSON.

{{
  "summary":"2-3 sentence professional summary",

  "strengths":[
    "...",
    "...",
    "..."
  ],

  "weaknesses":[
    "...",
    "...",
    "..."
  ],

  "suggestions":[
    "...",
    "...",
    "...",
    "...",
    "..."
  ],

  "experienceLevel":"Fresher | Junior | Mid-Level | Senior",

  "overallVerdict":"Excellent Match | Good Match | Moderate Match | Poor Match"
}}

Resume:

{resume_text}

Job Description:

{jd_text}
"""

    try:

        text = _generate_content(prompt)

        return _clean_json(text)

    except Exception as e:

        print("\n========== AI FAILED ==========")
        print(e)
        print("================================\n")

        return {

            "summary":
                "AI analysis is temporarily unavailable. ATS analysis and skill matching completed successfully.",

            "strengths": [],

            "weaknesses": [],

            "suggestions": [

                "Improve the missing skills identified by ResumeIQ.",

                "Customize your resume for each job description.",

                "Include measurable achievements wherever possible.",

                "Strengthen your project descriptions with impact.",

                "Keep your resume ATS-friendly and concise.",

            ],

            "experienceLevel": "Unknown",

            "overallVerdict": "AI Temporarily Unavailable",

        }


# Cover Letter Generator

def generate_cover_letter(
    resume_text: str,
    jd_text: str,
) -> str:

    prompt = f"""
You are an expert HR recruiter.

Write a professional cover letter.

Requirements:

- Maximum 300 words
- Professional tone
- ATS friendly
- No placeholders
- Mention company name if available
- Mention relevant skills from resume
- Mention why candidate is suitable
- End professionally

Resume:

{resume_text}

Job Description:

{jd_text}
"""

    try:

        return _generate_content(prompt)

    except Exception as e:

        print("\n========== COVER LETTER FAILED ==========")
        print(e)
        print("=========================================\n")

        return (
            "Cover letter generation is temporarily unavailable. "
            "Please try again later."
        )