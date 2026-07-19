import re
ACTION_VERBS = {
    "developed", "implemented", "designed", "built", "created",
    "optimized", "improved", "managed", "led", "engineered",
    "automated", "deployed", "integrated", "analyzed",
    "architected", "configured", "delivered", "executed",
    "maintained", "solved", "reduced", "increased",
    "boosted", "enhanced", "streamlined", "generated"
}

WEAK_PHRASES = {
    "responsible for",
    "worked on",
    "helped",
    "participated in",
    "involved in",
    "assisted with",
    "tasked with",
}

def analyze_content_quality(resume_text: str):
    """
    Analyze resume writing quality.
    Returns:
        score (0-15)
        breakdown
        suggestions
    """

    text = resume_text.lower()

    score = 0

    breakdown = {}

    suggestions = []

    # Resume Length (3)

    words = len(text.split())

    if 350 <= words <= 800:
        score += 3
        breakdown["Resume Length"] = 3
    elif 250 <= words < 350 or 800 < words <= 1000:
        score += 2
        breakdown["Resume Length"] = 2
        suggestions.append(
            "Resume length can be improved."
        )
    else:
        breakdown["Resume Length"] = 0
        suggestions.append(
            "Resume is too short or too long."
        )

    # Action Verbs (4)

    found_verbs = 0
    for verb in ACTION_VERBS:
        if verb in text:
            found_verbs += 1

    if found_verbs >= 10:
        score += 4
        breakdown["Action Verbs"] = 4
    elif found_verbs >= 5:
        score += 3
        breakdown["Action Verbs"] = 3
    elif found_verbs >= 2:
        score += 2
        breakdown["Action Verbs"] = 2
        suggestions.append(
            "Use stronger action verbs."
        )
    else:
        breakdown["Action Verbs"] = 0
        suggestions.append(
            "Resume lacks action verbs."
        )

    # 3. Quantified Achievements (3)

    numbers = len(
        re.findall(
            r"\d+%|\d+\+|\$\d+|\d+\s*(users|projects|clients|years)",
            text,
        )
    )
    if numbers >= 5:
        score += 3
        breakdown["Achievements"] = 3
    elif numbers >= 2:
        score += 2
        breakdown["Achievements"] = 2
        suggestions.append(
            "Add more quantified achievements."
        )
    else:
        breakdown["Achievements"] = 0
        suggestions.append(
            "Include measurable accomplishments."
        )

    # Bullet Points (2)

    bullets = len(
        re.findall(
            r"^[\s]*[-•*]",
            resume_text,
            re.MULTILINE,
        )
    )

    if bullets >= 8:
        score += 2
        breakdown["Bullet Points"] = 2
    elif bullets >= 4:
        score += 1
        breakdown["Bullet Points"] = 1
        suggestions.append(
            "Use more bullet points."
        )
    else:
        breakdown["Bullet Points"] = 0
        suggestions.append(
            "Resume contains very few bullet points."
        )

    # Weak Phrases (3)

    weak = 0

    for phrase in WEAK_PHRASES:
        weak += text.count(phrase)

    if weak == 0:
        score += 3
        breakdown["Writing Style"] = 3
    elif weak <= 2:
        score += 2
        breakdown["Writing Style"] = 2
        suggestions.append(
            "Reduce weak resume phrases."
        )
    else:
        breakdown["Writing Style"] = 0
        suggestions.append(
            "Replace weak wording with action-oriented language."
        )

    return {
        "score": score,
        "breakdown": breakdown,
        "suggestions": suggestions,
    }