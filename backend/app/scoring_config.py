"""
ResumeIQ Scoring Configuration
"""

MAX_SKILL_SCORE = 35
MAX_ATS_SCORE = 25
MAX_STRUCTURE_SCORE = 15
MAX_CONTENT_SCORE = 15
MAX_AI_SCORE = 10

GRADE_TABLE = [
    (97, "A+"),
    (93, "A"),
    (90, "A-"),
    (87, "B+"),
    (83, "B"),
    (80, "B-"),
    (77, "C+"),
    (73, "C"),
    (70, "C-"),
    (65, "D+"),
    (60, "D"),
    (0, "F"),
]

STAR_TABLE = [
    (97, 5.0),
    (93, 4.8),
    (90, 4.5),
    (85, 4.2),
    (80, 4.0),
    (75, 3.8),
    (70, 3.5),
    (65, 3.2),
    (60, 3.0),
    (0, 2.0),
]

READINESS_TABLE = [
    (90, "Excellent"),
    (80, "Very Good"),
    (70, "Good"),
    (60, "Needs Improvement"),
    (0, "Poor"),
]