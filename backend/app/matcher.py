import re
from sentence_transformers import SentenceTransformer, util

from app.skills_data import COMMON_SKILLS

model = SentenceTransformer("all-MiniLM-L6-v2")


def get_semantic_similarity(resume_text: str, jd_text: str) -> float:
    resume_embedding = model.encode(resume_text, convert_to_tensor=True)
    jd_embedding = model.encode(jd_text, convert_to_tensor=True)
    similarity = util.cos_sim(resume_embedding, jd_embedding).item()
    return round(similarity * 100, 2)


def find_skills_in_text(text: str, skills_list: list) -> list:
    text_lower = text.lower()
    found_skills = []

    for skill in skills_list:
        # word boundary check so "java" doesn't match inside "javascript"
        pattern = r"(?<!\w)" + re.escape(skill) + r"(?!\w)"
        if re.search(pattern, text_lower):
            found_skills.append(skill)

    return found_skills


def calculate_match_score(resume_text: str, jd_text: str) -> dict:
    semantic_score = get_semantic_similarity(resume_text, jd_text)

    resume_skills = find_skills_in_text(resume_text, COMMON_SKILLS)
    jd_skills = find_skills_in_text(jd_text, COMMON_SKILLS)

    matched_skills = [skill for skill in jd_skills if skill in resume_skills]
    missing_skills = [skill for skill in jd_skills if skill not in resume_skills]

    if jd_skills:
        skill_score = (len(matched_skills) / len(jd_skills)) * 100
    else:
        skill_score = 100

    final_score = (semantic_score * 0.4) + (skill_score * 0.6)

    return {
        "matchScore": round(final_score, 2),
        "matchedSkills": matched_skills,
        "missingSkills": missing_skills,
    }