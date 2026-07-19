from app.scoring_config import (
    MAX_SKILL_SCORE,
    MAX_ATS_SCORE,
    MAX_STRUCTURE_SCORE,
    MAX_CONTENT_SCORE,
    MAX_AI_SCORE,
    GRADE_TABLE,
    STAR_TABLE,
    READINESS_TABLE,
)

def normalize_score(score: float, max_score: float) -> float:
    """
    Converts any score into its weighted value.
    Example:
        78/100 ATS -> 19.5/25
    """
    return round((score / 100) * max_score, 2)

def calculate_structure_score(sections):
    """
    Resume Sections Score (0-15)
    """
    if not sections:
        return 0

    present = sum(
        1
        for section in sections
        if section.get("present", False)
    )
    total = len(sections)
    if total == 0:
        return 0
    return round((present / total) * MAX_STRUCTURE_SCORE, 2)


def calculate_ai_score(verdict):
    """
    Gemini contributes only 10 points.
    """

    verdict = verdict.lower()

    if "excellent" in verdict:
        return 10

    if "good" in verdict:
        return 8

    if "moderate" in verdict:
        return 6

    if "poor" in verdict:
        return 3

    return 5

def get_grade(score):
    for minimum, grade in GRADE_TABLE:
        if score >= minimum:
            return grade
    return "F"

def get_rating(score):
    for minimum, rating in STAR_TABLE:
        if score >= minimum:
            return rating

    return 2.0

def get_readiness(score):
    for minimum, label in READINESS_TABLE:
        if score >= minimum:
            return label

    return "Poor"

def calculate_final_score(
    match_score,
    ats_score,
    sections,
    content_result,
    ai_verdict,
):
    """
    Main ResumeIQ scoring engine.
    """

    # Weighted Scores

    weighted_skill = normalize_score(
        match_score,
        MAX_SKILL_SCORE,
    )

    weighted_ats = normalize_score(
        ats_score,
        MAX_ATS_SCORE,
    )

    weighted_structure = calculate_structure_score(
        sections,
    )

    weighted_content = content_result["score"]

    weighted_ai = calculate_ai_score(
        ai_verdict,
    )

    overall = round(
        weighted_skill
        + weighted_ats
        + weighted_structure
        + weighted_content
        + weighted_ai
    )

    overall = min(overall, 100)

    return {
        "overallScore": overall,

        "resumeGrade": get_grade(overall),

        "rating": get_rating(overall),

        "resumeReadiness": get_readiness(overall),

        "breakdown": {
            "Skill Match": weighted_skill,
            "ATS Compatibility": weighted_ats,
            "Resume Structure": weighted_structure,
            "Content Quality": weighted_content,
            "AI Review": weighted_ai,
        },
    }