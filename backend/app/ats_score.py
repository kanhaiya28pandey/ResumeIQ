import re

# Contact Information Score (10)

def calculate_contact_score(resume_text: str):
    score = 0
    reasons = []

    if re.search(
        r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}",
        resume_text,
    ):
        score += 5
    else:
        reasons.append("Email address not found.")

    if re.search(
        r"(\+?\d{1,3}[-.\s]?)?\d{10}",
        resume_text,
    ):
        score += 5
    else:
        reasons.append("Phone number not found.")

    return score, reasons


# Resume Sections Score (20)

def calculate_section_score(sections: list):
    score = 0
    reasons = []

    present_sections = [
        section
        for section in sections
        if section.get("present")
    ]

    score = min(len(present_sections) * 3, 18)
    important_sections = {
        "Skills",
        "Education",
        "Projects",
        "Experience",
    }

    found = {
        section["name"]
        for section in present_sections
    }

    missing = important_sections - found

    if not missing:
        score += 2
    else:
        reasons.append(
            "Missing important sections: "
            + ", ".join(sorted(missing))
        )

    return min(score, 20), reasons


# Formatting Score (15)


def calculate_formatting_score(resume_text: str):
    score = 0
    reasons = []

    bullets = len(
        re.findall(
            r"^[\s]*[•\-\*]",
            resume_text,
            re.MULTILINE,
        )
    )

    if bullets >= 10:
        score += 6

    elif bullets >= 5:
        score += 4

    elif bullets >= 2:
        score += 2
        reasons.append(
            "Use more bullet points."
        )
    else:
        reasons.append(
            "Very few bullet points detected."
        )

    if re.search(
        r"(linkedin\.com|github\.com|portfolio|behance|dribbble)",
        resume_text.lower(),
    ):
        score += 3
    else:
        reasons.append(
            "Professional profile or portfolio link not found."
        )

    blank_lines = len(
        re.findall(
            r"\n\s*\n\s*\n",
            resume_text,
        )
    )

    if blank_lines <= 2:
        score += 3
    else:
        reasons.append(
            "Too many unnecessary blank lines."
        )

    paragraphs = [
        p
        for p in resume_text.split("\n\n")
        if p.strip()
    ]

    long_para = any(
        len(p.split()) > 120
        for p in paragraphs
    )

    if not long_para:
        score += 3
    else:
        reasons.append(
            "Large paragraphs reduce ATS readability."
        )

    return min(score, 15), reasons


# Resume Length Score (10)

def calculate_length_score(resume_text: str):
    score = 0
    reasons = []
    words = len(
        resume_text.split()
    )
    if 350 <= words <= 850:
        score = 10
    elif 250 <= words < 350:
        score = 8
        reasons.append(
            "Resume can include more relevant details."
        )
    elif 850 < words <= 1000:
        score = 7
        reasons.append(
            "Resume is slightly lengthy."
        )
    else:
        score = 4
        reasons.append(
            "Resume length is not ATS friendly."
        )

    return score, reasons

# Skill Match Score (30)

def calculate_skill_score(
    matched_skills: list,
    missing_skills: list,
):
    score = 0
    reasons = []
    total = len(matched_skills) + len(missing_skills)
    if total == 0:
        reasons.append(
            "No job-specific skills detected."
        )
        return 15, reasons
    percentage = (
        len(matched_skills) / total
    ) * 100
    score = round((percentage / 100) * 30)
    if percentage < 50:
        reasons.append(
            "Resume is missing many required job skills."
        )
    elif percentage < 70:
        reasons.append(
            "Improve job-specific keyword coverage."
        )

    return score, reasons


# Resume Content Quality Score (15)

def calculate_content_quality_score(
    resume_text: str,
):
    score = 0
    reasons = []
    text = resume_text.lower()

    action_verbs = [
        "developed",
        "designed",
        "implemented",
        "created",
        "built",
        "managed",
        "led",
        "optimized",
        "improved",
        "automated",
        "deployed",
        "engineered",
        "delivered",
        "achieved",
        "increased",
        "reduced",
        "analyzed",
        "organized",
        "collaborated",
        "maintained",
    ]

    found = sum(
        1
        for word in action_verbs
        if word in text
    )

    if found >= 8:
        score += 6

    elif found >= 4:
        score += 4

    elif found >= 2:
        score += 2
        reasons.append(
            "Use stronger action verbs."
        )
    else:
        reasons.append(
            "Very few action verbs found."
        )

    # Numbers / Achievements

    achievements = len(
        re.findall(
            r"\d+%|\d+\+|\$\d+|\d+\s?(users|clients|projects|years|months)",
            text,
        )
    )
    if achievements >= 5:
        score += 5
    elif achievements >= 2:
        score += 3
    else:
        reasons.append(
            "Add quantified achievements."
        )

    # Weak Words

    weak_words = [
        "hardworking",
        "good",
        "nice",
        "responsible for",
        "helped",
        "worked on",
        "familiar with",
    ]

    weak_count = sum(
        text.count(word)
        for word in weak_words
    )

    if weak_count == 0:
        score += 4
    elif weak_count <= 2:
        score += 2
    else:
        reasons.append(
            "Replace weak phrases with measurable achievements."
        )

    return min(score, 15), reasons


# Final ATS Score

def calculate_ats_score(resume_text: str, sections: list, matched_skills: list, missing_skills: list,):
    reasons = []
    contact_score, r = calculate_contact_score(
        resume_text
    )
    reasons.extend(r)
    section_score, r = calculate_section_score(
        sections
    )
    reasons.extend(r)
    formatting_score, r = calculate_formatting_score(
        resume_text
    )
    reasons.extend(r)
    length_score, r = calculate_length_score(
        resume_text
    )
    reasons.extend(r)
    skill_score, r = calculate_skill_score(
        matched_skills,
        missing_skills,
    )
    reasons.extend(r)
    content_score, r = calculate_content_quality_score(
        resume_text
    )
    reasons.extend(r)
    ats_score = (
        contact_score
        + section_score
        + formatting_score
        + length_score
        + skill_score
        + content_score
    )
    ats_score = min(100, round(ats_score))

    # ATS Grade
    if ats_score >= 90:
        grade = "A+"

    elif ats_score >= 80:
        grade = "A"

    elif ats_score >= 70:
        grade = "B"

    elif ats_score >= 60:
        grade = "C"

    else:
        grade = "D"

    return {

        "atsScore": ats_score,

        "grade": grade,

        "breakdown": {

            "contact": contact_score,

            "sections": section_score,

            "formatting": formatting_score,

            "length": length_score,

            "skills": skill_score,

            "content": content_score,

        },
        "reasons": sorted(
            list(set(reasons))
        ),
    }