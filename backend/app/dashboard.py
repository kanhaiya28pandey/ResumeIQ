from fastapi import APIRouter, Depends
from collections import Counter
from app.auth_middleware import get_current_user
from app.database import scans_collection
router = APIRouter(tags=["dashboard"])

AI_TIPS = [
    "Customize your resume for every job application.",
    "Keep your resume to one page if you have less than 5 years of experience.",
    "Use action verbs like Built, Developed, Designed, Implemented.",
    "Add measurable achievements whenever possible.",
    "Match keywords from the job description.",
    "Include GitHub and LinkedIn profile links.",
    "Use ATS-friendly formatting.",
    "Avoid using tables and images inside your resume.",
    "Highlight your strongest projects first.",
    "Keep your skills section updated regularly.",
]

@router.get("/dashboard")
def get_dashboard(user_id: str = Depends(get_current_user)):
    scans = list(
        scans_collection.find(
            {"userId": user_id}
        ).sort("createdAt", -1)
    )
    if not scans:
        return {
            "totalScans": 0,
            "averageMatchScore": 0,
            "highestMatchScore": 0,
            "averageAtsScore": 0,
            "recentScans": [],
            "scoreTrend": [],
            "commonMissingSkills": [],
            "gradeDistribution": [],
            "domainDistribution": [],
            "verdictDistribution": [],
            "bestDomain": None,
            "bestResume": None,
            "tipOfDay": AI_TIPS[0],
        }

    # Basic Stats
    match_scores = [
        scan.get("matchScore", 0)
        for scan in scans
    ]

    ats_scores = [
        scan.get("atsScore", 0)
        for scan in scans
    ]

    # Trend

    trend = [
        {
            "date": scan["createdAt"],
            "matchScore": scan.get("matchScore", 0),
        }
        for scan in reversed(scans)
    ]

    # Missing Skills
    all_missing = []

    for scan in scans:
        all_missing.extend(
            scan.get("missingSkills", [])
        )
    common_missing = Counter(
        all_missing
    ).most_common(6)

    # ATS Grades

    grade_counter = Counter(
        scan.get("atsGrade", "N/A")
        for scan in scans
    )

    grade_distribution = [
        {
            "grade": grade,
            "count": count,
        }
        for grade, count in grade_counter.items()
    ]

    # Domain Distribution

    domain_counter = Counter(
        scan.get("detectedDomain", "Unknown")
        for scan in scans
    )
    domain_distribution = [
        {
            "domain": domain,
            "count": count,
        }
        for domain, count in domain_counter.items()
    ]

    # Verdict Distribution

    verdict_counter = Counter(
        scan.get("overallVerdict", "Unknown")
        for scan in scans
    )
    verdict_distribution = [
        {
            "verdict": verdict,
            "count": count,
        }
        for verdict, count in verdict_counter.items()
    ]

    # Best Resume

    best_resume = max(
        scans,
        key=lambda x: x.get(
            "matchScore",
            0,
        ),
    )

    # Best Domain

    best_domain = max(
        domain_counter.items(),
        key=lambda x: x[1],
    )[0]

    # Recent Scans

    recent_scans = []

    for scan in scans[:5]:
        recent_scans.append({
            "_id": str(scan["_id"]),
            "jobTitle":
                scan.get("jobTitle", ""),
            "matchScore":
                scan.get("matchScore", 0),
            "atsScore":
                scan.get("atsScore", 0),
            "createdAt":
                scan.get("createdAt"),
            "overallVerdict":
                scan.get("overallVerdict", ""),
        })

    # Tip Of Day

    tip = AI_TIPS[
        len(scans) % len(AI_TIPS)
    ]

    # Response
    roadmap = []
    missing_counter = Counter()

    for scan in scans:
        for skill in scan.get("missingSkills", []):
            missing_counter[skill] += 1
    top_skills = missing_counter.most_common(4)

    for skill, count in top_skills:
        progress = max(25, 100 - (count * 15))
        roadmap.append({
            "skill": skill,
            "progress": progress,
            "increase": f"+{count * 3}% Match"
        })
    return {
        "totalScans":
            len(scans),
        "averageMatchScore":
            round(
                sum(match_scores) /
                len(match_scores),
                2,
            ),

        "highestMatchScore":
            max(match_scores),

        "averageAtsScore":
            round(
                sum(ats_scores) /
                len(ats_scores),
                2,
            ),

        "recentScans":
            recent_scans,

        "scoreTrend":
            trend,

        "commonMissingSkills": [
            {
                "skill": skill,
                "count": count,
            }
            for skill, count
            in common_missing
        ],

        "gradeDistribution":
            grade_distribution,

        "domainDistribution":
            domain_distribution,

        "verdictDistribution":
            verdict_distribution,

        "bestDomain":
            best_domain,

        "bestResume": {

        "_id": str(best_resume["_id"]),

        "jobTitle": best_resume.get(
            "jobTitle",
            "",
        ),

        "detectedDomain": best_resume.get(
            "detectedDomain",
            "",
        ),

        "matchScore": best_resume.get(
            "matchScore",
            0,
        ),

        "atsGrade": best_resume.get(
            "atsGrade",
            "",
        ),

        "matchedSkills": best_resume.get(
            "matchedSkills",
            [],
        ),

        "overallVerdict": best_resume.get(
            "overallVerdict",
            "",
        ),

    },

        "tipOfDay":
            tip,
            
        "averageAtsScore": round(sum(ats_scores) / len(ats_scores), 2),

        "roadmap": roadmap,
    }