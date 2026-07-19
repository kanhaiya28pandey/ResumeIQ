import re
from sentence_transformers import SentenceTransformer, util
from app.skills_data import (
    get_domain_names,
    get_domain_keywords,
    get_all_skills,
    get_importance_weight,
)

model = SentenceTransformer("all-MiniLM-L6-v2")

def detect_domain(
    resume_text: str,
    jd_text: str,
    job_title: str = "",
) -> str:
    """
    Detect the most relevant professional domain using:
    1. Job Title
    2. Domain Keywords
    3. Skill Matches

    Returns:
        Domain name (str)
    """

    title = job_title.lower()
    resume = resume_text.lower()
    jd = jd_text.lower()

    best_domain = "Software Engineering"
    highest_score = -1

    for domain in get_domain_names():

        score = 0
        for keyword in get_domain_keywords(domain):
            keyword = keyword.lower()
            if re.search(r"\b" + re.escape(keyword) + r"\b", title):
                score += 10
            elif re.search(r"\b" + re.escape(keyword) + r"\b", jd):
                score += 4

        skills = get_all_skills(domain)
        for skill_name, info in skills.items():
            for alias in info.get("aliases", []):
                alias = alias.lower()
                if re.search(r"\b" + re.escape(alias) + r"\b", jd):
                    score += 1
                    break

        print(f"{domain}: {score}")
        if score > highest_score:
            highest_score = score
            best_domain = domain

    print("Selected Domain:", best_domain)
    return best_domain

def extract_skills(text: str, domain_name: str) -> dict:
    """
    Extract all skills found in the text for the given domain.
    Returns:
        {
            "Java": {...},
            "Spring Boot": {...}
        }
    """

    text = text.lower()
    found_skills = {}
    skills = get_all_skills(domain_name)
    for skill_name, info in skills.items():
        aliases = info.get("aliases", [])
        for alias in aliases:
            pattern = r"\b" + re.escape(alias.lower()) + r"\b"
            if re.search(pattern, text):
                found_skills[skill_name] = info
                break
    return found_skills

def extract_common_skills(text: str) -> dict:
    """
    Extract common professional (soft) skills.
    """
    return extract_skills(
        text,
        "Common Professional Skills"
    )

def merge_skill_sets(
    primary: dict,
    common: dict,
) -> dict:
    """
    Merge domain skills with common professional skills.
    """

    merged = primary.copy()
    merged.update(common)
    return merged

def calculate_skill_score(
    resume_skills: dict,
    jd_skills: dict,
):
    """
    Calculate weighted skill score.
    """

    matched = set()

    missing = set()

    critical_missing = set()

    supporting_missing = set()

    matched_weight = 0

    total_weight = 0

    for skill_name, info in jd_skills.items():

        weight = get_importance_weight(
            info["importance"]
        )

        total_weight += weight

        if skill_name in resume_skills:

            matched.add(skill_name)

            matched_weight += weight

        else:
            missing.add(skill_name)

            if info["importance"] in ("Core", "High"):

                critical_missing.add(skill_name)

            else:

                supporting_missing.add(skill_name)

    score = 0

    if total_weight:

        score = round(
            (matched_weight / total_weight) * 100,
            2,
        )

    return {

        "skillScore": score,

        "matchedSkills": sorted(list(matched)),

        "missingSkills": sorted(list(missing)),

        "criticalMissingSkills": sorted(list(critical_missing)),

        "supportingMissingSkills": sorted(list(supporting_missing)),

        "matchedWeight": matched_weight,

        "totalWeight": total_weight,

    }

def get_semantic_similarity(
    resume_text: str,
    jd_text: str,
) -> float:

    """
    Calculate semantic similarity using
    SentenceTransformer.
    """

    resume_text = resume_text[:2000]

    jd_text = jd_text[:1000]

    resume_embedding = model.encode(
        resume_text,
        convert_to_tensor=True,
    )

    jd_embedding = model.encode(
        jd_text,
        convert_to_tensor=True,
    )

    similarity = util.cos_sim(
        resume_embedding,
        jd_embedding,
    ).item()

    return round(
        max(0, similarity * 100),
        2,
    )

def calculate_match_score(
    resume_text: str,
    jd_text: str,
    job_title: str = "",
) -> dict:
    """
    Main ResumeIQ matching pipeline.

    Steps:
    1. Detect professional domain
    2. Extract domain skills
    3. Extract common professional skills
    4. Calculate weighted skill score
    5. Calculate semantic similarity
    6. Compute final match score
    """

    # Detect Domain

    detected_domain = detect_domain(
        resume_text,
        jd_text,
        job_title,
    )

    # Extract Domain Skills

    resume_domain_skills = extract_skills(
        resume_text,
        detected_domain,
    )

    jd_domain_skills = extract_skills(
        jd_text,
        detected_domain,
    )

    # Extract Common Skills

    resume_common = extract_common_skills(
        resume_text,
    )

    jd_common = extract_common_skills(
        jd_text,
    )

    # Merge Domain + Common Skills

    resume_skills = merge_skill_sets(
        resume_domain_skills,
        resume_common,
    )

    jd_skills = merge_skill_sets(
        jd_domain_skills,
        jd_common,
    )

    # Weighted Skill Score

    skill_result = calculate_skill_score(
        resume_skills,
        jd_skills,
    )

    # Semantic Score

    semantic_score = get_semantic_similarity(
        resume_text,
        jd_text,
    )

    # Final Match Score
    # ResumeIQ v1 Formula
    #
    # Skill Score      = 80%
    # Semantic Score   = 20%

    final_score = round(
    (skill_result["skillScore"] * 0.85)
    + (semantic_score * 0.15),
    2,
)
    return {

        "detectedDomain": detected_domain,

        "semanticScore": semantic_score,

        "skillScore": skill_result["skillScore"],

        "matchScore": final_score,

        "matchedSkills": skill_result["matchedSkills"],

        "missingSkills": skill_result["missingSkills"],

        "criticalMissingSkills": skill_result["criticalMissingSkills"],

        "supportingMissingSkills": skill_result["supportingMissingSkills"],

        "matchedWeight": skill_result["matchedWeight"],

        "totalWeight": skill_result["totalWeight"],

        "matchedSkillsCount": len(skill_result["matchedSkills"]),

        "missingSkillsCount": len(skill_result["missingSkills"]),

        "totalSkills": len(jd_skills),
    }
