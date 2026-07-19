import re

SECTION_PATTERNS = {
    "Contact Information": [
        r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}",
        r"(\+?\d{1,3}[-.\s]?)?\d{10}",
    ],
    "Summary": [
        r"\bsummary\b",
        r"\bprofessional summary\b",
        r"\bobjective\b",
    ],
    "Education": [
        r"\beducation\b",
        r"\bacademic\b",
    ],
    "Experience": [
        r"\bexperience\b",
        r"\bwork experience\b",
        r"\bemployment\b",
    ],
    "Projects": [
        r"\bprojects\b",
        r"\bproject\b",
    ],
    "Skills": [
        r"\bskills\b",
        r"\btechnical skills\b",
    ],
    "Certifications": [
        r"\bcertifications\b",
        r"\bcertificates\b",
        r"\blicenses\b",
    ],
    "Achievements": [
        r"\bachievements\b",
        r"\baccomplishments\b",
        r"\bawards\b",
    ],
}

def analyze_resume_sections(resume_text: str):
    text = resume_text.lower()

    results = []
    for section, patterns in SECTION_PATTERNS.items():
        found = any(re.search(pattern, text) for pattern in patterns)
        results.append({
            "name": section,
            "present": found
        })

    return results