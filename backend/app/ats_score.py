import re


def calculate_ats_score(resume_text: str) -> dict:
    score = 0
    reasons = []

    has_email = bool(re.search(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", resume_text))
    has_phone = bool(re.search(r"(\+?\d{1,3}[-.\s]?)?\d{10}", resume_text))

    if has_email:
        score += 10
    else:
        reasons.append("No email address found")

    if has_phone:
        score += 10
    else:
        reasons.append("No phone number found")

    bullet_pattern = r"^[\s]*[•\-\*\u2022]"
    bullet_lines = re.findall(bullet_pattern, resume_text, re.MULTILINE)

    if len(bullet_lines) >= 3:
        score += 20
    elif len(bullet_lines) >= 1:
        score += 10
        reasons.append("Very few bullet points found, consider using more")
    else:
        reasons.append("No bullet points found, resume may be hard to scan")

    common_sections = ["experience", "education", "skills", "projects", "summary", "objective"]
    text_lower = resume_text.lower()
    sections_found = [section for section in common_sections if section in text_lower]

    section_points = min(len(sections_found), 4) * 10
    score += section_points

    if len(sections_found) < 3:
        reasons.append("Missing common section headers like Experience, Education, or Skills")

    word_count = len(resume_text.split())

    if 300 <= word_count <= 800:
        score += 20
    elif 150 <= word_count < 300 or 800 < word_count <= 1000:
        score += 10
        reasons.append("Resume length is a bit off the ideal range (300-800 words)")
    else:
        reasons.append("Resume is too short or too long for ideal ATS scanning")

    return {
        "atsScore": score,
        "reasons": reasons,
    }