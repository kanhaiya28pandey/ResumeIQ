"""
=========================================================
ResumeIQ Skills Database
=========================================================
ResumeIQ Skills Database

Version : 1.0

This module contains the master skills database used by
ResumeIQ.

Features
--------
- 20 Professional Domains
- Common Professional Skills
- Skill Aliases
- Importance Levels
- Domain Keywords

This database is used by:

- matcher.py
- scoring.py
- analyze.py

This file contains domain-wise skills used by the ResumeIQ
matching engine.

Each skill contains:

- aliases
- importance
- weight

Importance Levels
-----------------
Core       = 5
High       = 4
Medium     = 3
Supporting = 2
Optional   = 1
=========================================================
"""

IMPORTANCE_WEIGHTS = {
    "Core": 5,
    "High": 4,
    "Medium": 3,
    "Supporting": 2,
    "Optional": 1,
}

SKILLS_DATABASE = {

# =====================================================
# SOFTWARE ENGINEERING
# =====================================================

"Software Engineering": {
     "keywords": [
        "software engineer",
        "software developer",
        "backend developer",
        "frontend developer",
        "full stack developer",
        "java developer",
        "python developer",
        "web developer",
        "application developer",
        "software programmer"
    ],
    # -------------------------------
    # Programming Languages
    # -------------------------------

    "Programming Languages": {

        "Java": {
            "aliases": ["java", "jdk"],
            "importance": "Core",
        },

        "Python": {
            "aliases": ["python"],
            "importance": "Core",
        },

        "JavaScript": {
            "aliases": ["javascript", "js"],
            "importance": "Core",
        },

        "TypeScript": {
            "aliases": ["typescript", "ts"],
            "importance": "High",
        },

        "C": {
            "aliases": ["c language", "ansi c"],
            "importance": "Medium",
        },

        "C++": {
            "aliases": ["cpp", "c++"],
            "importance": "Medium",
        },

        "C#": {
            "aliases": ["c#", "c sharp"],
            "importance": "Medium",
        },

        "Go": {
            "aliases": ["golang", "go"],
            "importance": "Medium",
        },

        "Rust": {
            "aliases": ["rust"],
            "importance": "Supporting",
        },

        "PHP": {
            "aliases": ["php"],
            "importance": "Supporting",
        },

        "Kotlin": {
            "aliases": ["kotlin"],
            "importance": "Supporting",
        },

        "Swift": {
            "aliases": ["swift"],
            "importance": "Supporting",
        }

    },

    # -------------------------------
    # Backend
    # -------------------------------

    "Backend Frameworks": {

        "Spring": {
            "aliases": ["spring"],
            "importance": "Core",
        },

        "Spring Boot": {
            "aliases": ["spring boot", "springboot"],
            "importance": "Core",
        },

        "Hibernate": {
            "aliases": ["hibernate"],
            "importance": "High",
        },

        "Node.js": {
            "aliases": ["node", "nodejs", "node.js"],
            "importance": "High",
        },

        "Express.js": {
            "aliases": ["express", "expressjs"],
            "importance": "High",
        },

        "Django": {
            "aliases": ["django"],
            "importance": "High",
        },

        "Flask": {
            "aliases": ["flask"],
            "importance": "Medium",
        },

        "FastAPI": {
            "aliases": ["fastapi", "fast api"],
            "importance": "Medium",
        },

        "ASP.NET": {
            "aliases": ["asp.net", ".net"],
            "importance": "Medium",
        },

        "Microservices": {
            "aliases": ["microservices", "microservice architecture"],
            "importance": "High",
        },

        "JUnit": {
            "aliases": ["junit"],
            "importance": "Medium",
        },

    },

    # -------------------------------
    # Frontend
    # -------------------------------

    "Frontend": {

        "React": {
            "aliases": ["react", "reactjs"],
            "importance": "Core",
        },

        "Angular": {
            "aliases": ["angular"],
            "importance": "Medium",
        },

        "Vue.js": {
            "aliases": ["vue", "vuejs"],
            "importance": "Medium",
        },

        "HTML": {
            "aliases": ["html", "html5"],
            "importance": "Core",
        },

        "CSS": {
            "aliases": ["css", "css3"],
            "importance": "Core",
        },

        "Tailwind CSS": {
            "aliases": ["tailwind", "tailwind css"],
            "importance": "High",
        },

        "Bootstrap": {
            "aliases": ["bootstrap"],
            "importance": "Supporting",
        }

    },

    # -------------------------------
    # Database
    # -------------------------------

    "Databases": {

        "MySQL": {
            "aliases": ["mysql"],
            "importance": "Core",
        },

        "PostgreSQL": {
            "aliases": ["postgres", "postgresql"],
            "importance": "High",
        },

        "MongoDB": {
            "aliases": ["mongodb", "mongo"],
            "importance": "Core",
        },

        "Oracle": {
            "aliases": ["oracle sql", "oracle"],
            "importance": "Medium",
        },

        "SQLite": {
            "aliases": ["sqlite"],
            "importance": "Supporting",
        }

    },

    # -------------------------------
    # APIs
    # -------------------------------

    "API Development": {

        "REST API": {
            "aliases": [
                "rest api",
                "restful api",
                "rest"
            ],
            "importance": "Core",
        },

        "GraphQL": {
            "aliases": ["graphql"],
            "importance": "Medium",
        },

        "Swagger": {
            "aliases": ["swagger", "openapi"],
            "importance": "Medium",
        },

    },

    # -------------------------------
    # Version Control
    # -------------------------------

    "Version Control": {

        "Git": {
            "aliases": ["git"],
            "importance": "High",
        },

        "GitHub": {
            "aliases": ["github"],
            "importance": "High",
        },

        "GitLab": {
            "aliases": ["gitlab"],
            "importance": "Supporting",
        }

    }

},"Cloud & DevOps": {
    "keywords": [
    "devops engineer",
    "cloud engineer",
    "cloud architect",
    "site reliability engineer",
    "sre",
    "aws engineer",
    "aws architect",
    "azure engineer",
    "gcp engineer",
    "platform engineer",
    "infrastructure engineer",
    "release engineer"
],
    "Cloud Platforms": {

        "AWS": {
            "aliases": ["aws", "amazon web services"],
            "importance": "Core",
        },

        "Microsoft Azure": {
            "aliases": ["azure", "microsoft azure"],
            "importance": "High",
        },

        "Google Cloud Platform": {
            "aliases": ["gcp", "google cloud", "google cloud platform"],
            "importance": "High",
        },

        "Linux": {
            "aliases": ["linux"],
            "importance": "Core",
        },

        "Shell Scripting": {
            "aliases": ["shell scripting", "bash"],
            "importance": "Medium",
        },

        "Nginx": {
           "aliases": ["nginx"],
            "importance": "Medium",
        },

    },

    "Containers": {

        "Docker": {
            "aliases": ["docker"],
            "importance": "Core",
        },

        "Kubernetes": {
            "aliases": ["kubernetes", "k8s"],
            "importance": "Core",
        },

        "OpenShift": {
            "aliases": ["openshift"],
            "importance": "Supporting",
        }

    },

    "CI/CD": {

        "Jenkins": {
            "aliases": ["jenkins"],
            "importance": "Core",
        },

        "GitHub Actions": {
            "aliases": ["github actions"],
            "importance": "High",
        },

        "GitLab CI": {
            "aliases": ["gitlab ci"],
            "importance": "Medium",
        },

        "Azure DevOps": {
            "aliases": ["azure devops"],
            "importance": "Medium",
        }

    },

    "Infrastructure": {

        "Terraform": {
            "aliases": ["terraform"],
            "importance": "High",
        },

        "Ansible": {
            "aliases": ["ansible"],
            "importance": "Medium",
        }

    },

    "Monitoring": {

        "Prometheus": {
            "aliases": ["prometheus"],
            "importance": "Medium",
        },

        "Grafana": {
            "aliases": ["grafana"],
            "importance": "Medium",
        },

        "ELK Stack": {
            "aliases": [
                "elk",
                "elasticsearch",
                "logstash",
                "kibana"
            ],
            "importance": "Supporting",
        }

    }

},
"Data Science & AI": {
    "keywords": [
    "data scientist",
    "data analyst",
    "machine learning engineer",
    "ml engineer",
    "ai engineer",
    "artificial intelligence engineer",
    "deep learning engineer",
    "business intelligence analyst",
    "analytics engineer",
    "research scientist"
],
    "Programming": {

        "Python": {
            "aliases": ["python"],
            "importance": "Core",
        },

        "R": {
            "aliases": ["r programming", "r"],
            "importance": "Medium",
        }

    },

    "Data Analysis": {

        "Pandas": {
            "aliases": ["pandas"],
            "importance": "Core",
        },

        "NumPy": {
            "aliases": ["numpy"],
            "importance": "Core",
        },

        "Matplotlib": {
            "aliases": ["matplotlib"],
            "importance": "High",
        },

        "Seaborn": {
            "aliases": ["seaborn"],
            "importance": "Medium",
        }

    },

    "Machine Learning": {

        "Scikit-learn": {
            "aliases": ["scikit learn", "sklearn"],
            "importance": "Core",
        },

        "TensorFlow": {
            "aliases": ["tensorflow"],
            "importance": "High",
        },

        "PyTorch": {
            "aliases": ["pytorch"],
            "importance": "High",
        },

        "XGBoost": {
            "aliases": ["xgboost"],
            "importance": "Supporting",
        },

        "OpenCV": {
            "aliases": ["opencv"],
            "importance": "Medium",
        },

        "Natural Language Processing": {
            "aliases": ["nlp", "natural language processing"],
            "importance": "High",
        },

        "LLM": {
            "aliases": [
            "large language model",
            "llm",
            "generative ai",
            "gen ai"
        ],
        "importance": "High",
        },

    },

    "Deep Learning": {

        "Neural Networks": {
            "aliases": [
                "neural network",
                "deep learning"
            ],
            "importance": "High",
        }

    },

    "Visualization": {

        "Power BI": {
            "aliases": ["power bi"],
            "importance": "Core",
        },

        "Tableau": {
            "aliases": ["tableau"],
            "importance": "Core",
        },

        "Excel": {
            "aliases": ["excel", "microsoft excel"],
            "importance": "High",
        }

    },

    "Databases": {

        "SQL": {
            "aliases": ["sql"],
            "importance": "Core",
        },

        "MongoDB": {
            "aliases": ["mongodb"],
            "importance": "Medium",
        }

    }

},
"Cybersecurity": {
    "keywords": [
    "cyber security",
    "cybersecurity analyst",
    "security analyst",
    "security engineer",
    "ethical hacker",
    "penetration tester",
    "pentester",
    "soc analyst",
    "information security analyst",
    "security consultant"
],
    "Security": {

        "Network Security": {
            "aliases": ["network security"],
            "importance": "Core",
        },

        "Application Security": {
            "aliases": ["application security"],
            "importance": "High",
        },

        "Cloud Security": {
            "aliases": ["cloud security"],
            "importance": "High",
        }

    },

    "Ethical Hacking": {

        "Penetration Testing": {
            "aliases": [
                "penetration testing",
                "pentesting"
            ],
            "importance": "Core",
        },

        "Kali Linux": {
            "aliases": ["kali linux", "kali"],
            "importance": "Core",
        },

        "Metasploit": {
            "aliases": ["metasploit"],
            "importance": "High",
        },

        "Burp Suite": {
            "aliases": ["burp suite"],
            "importance": "High",
        },

        "Wireshark": {
            "aliases": ["wireshark"],
            "importance": "Medium",
        },

        "Nmap": {
            "aliases": ["nmap"],
            "importance": "High",
        },

    },

    "Networking": {

        "TCP/IP": {
            "aliases": ["tcp/ip", "tcp ip"],
            "importance": "Core",
        },

        "Firewalls": {
            "aliases": ["firewall", "firewalls"],
            "importance": "Core",
        },

        "VPN": {
            "aliases": ["vpn"],
            "importance": "Medium",
        }

    },

    "Standards": {

        "OWASP": {
            "aliases": ["owasp"],
            "importance": "Core",
        },

        "ISO 27001": {
            "aliases": ["iso 27001"],
            "importance": "Medium",
        }

    }

},
# =====================================================
# MOBILE DEVELOPMENT
# =====================================================

"Mobile Development": {
    "keywords": [
    "android developer",
    "ios developer",
    "flutter developer",
    "react native developer",
    "mobile developer",
    "mobile application developer",
    "android engineer",
    "ios engineer"
],
    "Languages": {

        "Kotlin": {
            "aliases": ["kotlin"],
            "importance": "Core",
        },

        "Swift": {
            "aliases": ["swift"],
            "importance": "Core",
        },

        "Java": {
            "aliases": ["java"],
            "importance": "High",
        },

        "Dart": {
            "aliases": ["dart"],
            "importance": "Core",
        }

    },

    "Frameworks": {

        "Flutter": {
            "aliases": ["flutter"],
            "importance": "Core",
        },

        "React Native": {
            "aliases": ["react native", "react-native"],
            "importance": "Core",
        },

        "Android Studio": {
            "aliases": ["android studio"],
            "importance": "High",
        },

        "Xcode": {
            "aliases": ["xcode"],
            "importance": "High",
        },

        "Jetpack Compose": {
            "aliases": ["jetpack compose"],
            "importance": "Medium",
        },

    },

    "Concepts": {

        "Firebase": {
            "aliases": ["firebase"],
            "importance": "High",
        },

        "SQLite": {
            "aliases": ["sqlite"],
            "importance": "Medium",
        },

        "REST API": {
            "aliases": ["rest api", "rest"],
            "importance": "Core",
        }

    }

},

# =====================================================
# UI / UX DESIGN
# =====================================================

"UI/UX Design": {
    "keywords": [
    "ui designer",
    "ux designer",
    "product designer",
    "visual designer",
    "graphic designer",
    "interaction designer",
    "user experience designer",
    "user interface designer"
],
    "Design Tools": {

        "Figma": {
            "aliases": ["figma"],
            "importance": "Core",
        },

        "Adobe XD": {
            "aliases": ["adobe xd"],
            "importance": "High",
        },

        "Sketch": {
            "aliases": ["sketch"],
            "importance": "Medium",
        },

        "Photoshop": {
            "aliases": ["photoshop", "adobe photoshop"],
            "importance": "Medium",
        }

    },

    "UX": {

        "Wireframing": {
            "aliases": ["wireframe", "wireframing"],
            "importance": "Core",
        },

        "Prototyping": {
            "aliases": ["prototype", "prototyping"],
            "importance": "Core",
        },

        "User Research": {
            "aliases": ["user research"],
            "importance": "High",
        },

        "Usability Testing": {
            "aliases": ["usability testing"],
            "importance": "Medium",
        }

    }

},

# =====================================================
# MARKETING
# =====================================================

"Marketing": {

    "keywords": [
        "marketing executive",
        "digital marketer",
        "marketing specialist",
        "seo specialist",
        "content marketer",
        "social media manager",
        "performance marketer",
        "brand manager"
    ],
    "Digital Marketing": {

        "SEO": {
            "aliases": [
                "seo",
                "search engine optimization"
            ],
            "importance": "Core",
        },

        "SEM": {
            "aliases": [
                "sem",
                "search engine marketing"
            ],
            "importance": "High",
        },

        "Google Ads": {
            "aliases": [
                "google ads",
                "adwords"
            ],
            "importance": "Core",
        },

        "Meta Ads": {
            "aliases": [
                "facebook ads",
                "meta ads"
            ],
            "importance": "High",
        }

    },

    "Analytics": {

        "Google Analytics": {
            "aliases": [
                "google analytics",
                "ga4"
            ],
            "importance": "Core",
        },

        "Google Search Console": {
            "aliases": [
                "search console",
                "google search console"
            ],
            "importance": "Medium",
        },

        "Canva": {
            "aliases": ["canva"],
            "importance": "Medium",
        },

        "Google Tag Manager": {
            "aliases": ["google tag manager", "gtm"],
            "importance": "Medium",
        },

    },

    "Content": {

        "Content Marketing": {
            "aliases": [
                "content marketing"
            ],
            "importance": "High",
        },

        "Email Marketing": {
            "aliases": [
                "email marketing"
            ],
            "importance": "Medium",
        },

        "Social Media Marketing": {
            "aliases": [
                "social media marketing",
                "smm"
            ],
            "importance": "Core",
        }

    }

},

# =====================================================
# HUMAN RESOURCES
# =====================================================

"Human Resources": {
    "keywords": [
        "hr executive",
        "hr manager",
        "human resources",
        "recruiter",
        "talent acquisition",
        "technical recruiter",
        "hr generalist"
    ],
    "Recruitment": {

        "Recruitment": {
            "aliases": [
                "recruitment",
                "hiring"
            ],
            "importance": "Core",
        },

        "Talent Acquisition": {
            "aliases": [
                "talent acquisition"
            ],
            "importance": "Core",
        },

        "Interviewing": {
            "aliases": [
                "interviewing",
                "candidate interview"
            ],
            "importance": "High",
        }

    },

    "HR Operations": {

        "Payroll": {
            "aliases": [
                "payroll"
            ],
            "importance": "High",
        },

        "HRIS": {
            "aliases": [
                "hris"
            ],
            "importance": "High",
        },

        "Employee Relations": {
            "aliases": [
                "employee relations"
            ],
            "importance": "Core",
        },

        "Performance Management": {
            "aliases": [
                "performance management"
            ],
            "importance": "Medium",
        },

        "Employee Engagement": {
            "aliases": ["employee engagement"],
            "importance": "Medium",
        },

    }

},
# =====================================================
# FINANCE & ACCOUNTING
# =====================================================

"Finance & Accounting": {
    "keywords": [
        "accountant",
        "chartered accountant",
        "financial analyst",
        "finance executive",
        "finance manager",
        "tax consultant",
        "auditor"
    ],
    "Accounting": {

        "Accounting": {
            "aliases": ["accounting"],
            "importance": "Core",
        },

        "Bookkeeping": {
            "aliases": ["bookkeeping"],
            "importance": "Medium",
        },

        "Accounts Payable": {
            "aliases": ["accounts payable", "ap"],
            "importance": "High",
        },

        "Accounts Receivable": {
            "aliases": ["accounts receivable", "ar"],
            "importance": "High",
        }

    },

    "Finance": {

        "Financial Analysis": {
            "aliases": [
                "financial analysis",
                "financial analyst"
            ],
            "importance": "Core",
        },

        "Financial Modeling": {
            "aliases": [
                "financial modeling",
                "financial modelling"
            ],
            "importance": "High",
        },

        "Budgeting": {
            "aliases": ["budgeting"],
            "importance": "High",
        },

        "Forecasting": {
            "aliases": ["forecasting"],
            "importance": "Medium",
        },

        "GST": {
            "aliases": ["gst"],
            "importance": "High",
        },

        "Taxation": {
            "aliases": ["taxation"],
            "importance": "High",
        },

    },

    "Tools": {

        "Excel": {
            "aliases": [
                "excel",
                "microsoft excel"
            ],
            "importance": "Core",
        },

        "Tally": {
            "aliases": ["tally", "tally erp"],
            "importance": "Core",
        },

        "SAP": {
            "aliases": ["sap"],
            "importance": "High",
        }

    }
    

},

# =====================================================
# BANKING
# =====================================================

"Banking": {
    "keywords": [
    "bank officer",
    "relationship manager",
    "credit analyst",
    "loan officer",
    "bank manager",
    "retail banker",
    "corporate banker",
    "banking executive"
],
    "Core Banking": {

        "Retail Banking": {
            "aliases": ["retail banking"],
            "importance": "Core",
        },

        "Corporate Banking": {
            "aliases": ["corporate banking"],
            "importance": "High",
        },

        "Credit Analysis": {
            "aliases": ["credit analysis"],
            "importance": "Core",
        },

        "Loan Processing": {
            "aliases": ["loan processing"],
            "importance": "High",
        }

    },

    "Compliance": {

        "KYC": {
            "aliases": [
                "kyc",
                "know your customer"
            ],
            "importance": "Core",
        },

        "AML": {
            "aliases": [
                "aml",
                "anti money laundering"
            ],
            "importance": "High",
        }

    }

},

# =====================================================
# SALES
# =====================================================

"Sales": {
    "keywords": [
    "sales executive",
    "sales manager",
    "business development executive",
    "business development manager",
    "sales representative",
    "inside sales",
    "account executive",
    "sales consultant"
],
    "Sales Skills": {

        "Lead Generation": {
            "aliases": [
                "lead generation"
            ],
            "importance": "Core",
        },

        "Cold Calling": {
            "aliases": [
                "cold calling"
            ],
            "importance": "High",
        },

        "Negotiation": {
            "aliases": [
                "negotiation"
            ],
            "importance": "Core",
        },

        "Sales Forecasting": {
            "aliases": [
                "sales forecasting"
            ],
            "importance": "Medium",
        }

    },

    "CRM": {

        "Salesforce": {
            "aliases": ["salesforce"],
            "importance": "Core",
        },

        "HubSpot": {
            "aliases": ["hubspot"],
            "importance": "High",
        },

        "CRM": {
            "aliases": ["crm"],
            "importance": "Core",
        },

    }

},

# =====================================================
# BUSINESS ANALYST
# =====================================================

"Business Analyst": {
    "keywords": [
    "business analyst",
    "functional analyst",
    "system analyst",
    "business consultant",
    "requirements analyst",
    "process analyst"
],
    "Analysis": {

        "Requirement Gathering": {
            "aliases": [
                "requirement gathering"
            ],
            "importance": "Core",
        },

        "Business Process Modeling": {
            "aliases": [
                "business process modeling"
            ],
            "importance": "High",
        },

        "Gap Analysis": {
            "aliases": [
                "gap analysis"
            ],
            "importance": "Medium",
        }

    },

    "Tools": {

        "JIRA": {
            "aliases": [
                "jira"
            ],
            "importance": "Core",
        },

        "Confluence": {
            "aliases": [
                "confluence"
            ],
            "importance": "Medium",
        },

        "Visio": {
            "aliases": [
                "visio"
            ],
            "importance": "Supporting",
        }

    }

},

# =====================================================
# PRODUCT MANAGEMENT
# =====================================================

"Product Management": {
    "keywords": [
    "product manager",
    "associate product manager",
    "product owner",
    "technical product manager",
    "product lead"
],
    "Product": {

        "Product Strategy": {
            "aliases": [
                "product strategy"
            ],
            "importance": "Core",
        },

        "Roadmap Planning": {
            "aliases": [
                "roadmap planning"
            ],
            "importance": "Core",
        },

        "Market Research": {
            "aliases": [
                "market research"
            ],
            "importance": "High",
        }

    },

    "Agile": {

        "Scrum": {
            "aliases": [
                "scrum"
            ],
            "importance": "Core",
        },

        "Kanban": {
            "aliases": [
                "kanban"
            ],
            "importance": "Medium",
        }

    }

},

# =====================================================
# PROJECT MANAGEMENT
# =====================================================

"Project Management": {
    "keywords": [
    "project manager",
    "project coordinator",
    "program manager",
    "delivery manager",
    "scrum master",
    "technical project manager"
],
    "Management": {

        "Project Planning": {
            "aliases": [
                "project planning"
            ],
            "importance": "Core",
        },

        "Risk Management": {
            "aliases": [
                "risk management"
            ],
            "importance": "Core",
        },

        "Stakeholder Management": {
            "aliases": [
                "stakeholder management"
            ],
            "importance": "High",
        }

    },

    "Methodologies": {

        "Agile": {
            "aliases": [
                "agile"
            ],
            "importance": "Core",
        },

        "Scrum": {
            "aliases": [
                "scrum"
            ],
            "importance": "Core",
        },

        "PMP": {
            "aliases": [
                "pmp"
            ],
            "importance": "High",
        }

    }

},
# =====================================================
# HEALTHCARE
# =====================================================

"Healthcare": {

    "keywords": [
    "doctor",
    "physician",
    "medical officer",
    "staff nurse",
    "registered nurse",
    "healthcare assistant",
    "clinical researcher",
    "medical coder",
    "medical laboratory technician",
    "lab technician",
    "pharmacist",
    "radiologist",
    "dentist",
    "physiotherapist"
],

    "Clinical": {

        "Patient Care": {
            "aliases": ["patient care"],
            "importance": "Core",
        },

        "Medical Coding": {
            "aliases": ["medical coding","icd"],
            "importance": "High",
        },

        "Electronic Health Records": {
            "aliases": ["ehr","electronic health records","emr"],
            "importance": "High",
        },

        "Clinical Research": {
            "aliases": ["clinical research"],
            "importance": "Medium",
        }

    }

},

# =====================================================
# LEGAL
# =====================================================

"Legal": {

    "keywords": [
    "lawyer",
    "advocate",
    "legal advisor",
    "legal consultant",
    "corporate lawyer",
    "legal executive",
    "legal associate",
    "attorney",
    "paralegal",
    "legal officer"
],

    "Legal Practice": {

        "Contract Drafting": {
            "aliases": ["contract drafting"],
            "importance": "Core",
        },

        "Legal Research": {
            "aliases": ["legal research"],
            "importance": "Core",
        },

        "Litigation": {
            "aliases": ["litigation"],
            "importance": "High",
        },

        "Compliance": {
            "aliases": ["legal compliance"],
            "importance": "High",
        }

    }

},

# =====================================================
# EDUCATION
# =====================================================

"Education": {

    "keywords": [
    "teacher",
    "school teacher",
    "lecturer",
    "assistant professor",
    "associate professor",
    "professor",
    "faculty",
    "trainer",
    "academic coordinator",
    "education consultant"
],

    "Teaching": {

        "Lesson Planning": {
            "aliases": ["lesson planning"],
            "importance": "Core",
        },

        "Classroom Management": {
            "aliases": ["classroom management"],
            "importance": "Core",
        },

        "Curriculum Development": {
            "aliases": ["curriculum development"],
            "importance": "High",
        },

        "Assessment": {
            "aliases": ["student assessment"],
            "importance": "Medium",
        }

    }

},

# =====================================================
# SUPPLY CHAIN & LOGISTICS
# =====================================================

"Supply Chain & Logistics": {

    "keywords": [
    "supply chain manager",
    "logistics manager",
    "warehouse manager",
    "inventory manager",
    "operations executive",
    "procurement specialist",
    "procurement executive",
    "logistics executive",
    "distribution manager",
    "materials manager"
],

    "Operations": {

        "Inventory Management": {
            "aliases": ["inventory management"],
            "importance": "Core",
        },

        "Procurement": {
            "aliases": ["procurement"],
            "importance": "Core",
        },

        "Warehouse Management": {
            "aliases": ["warehouse management"],
            "importance": "High",
        },

        "SAP SCM": {
            "aliases": ["sap scm"],
            "importance": "Medium",
        }

    }

},

# =====================================================
# CUSTOMER SUPPORT
# =====================================================

"Customer Support": {

    "keywords": [
    "customer support",
    "customer service",
    "technical support",
    "support engineer",
    "support executive",
    "customer success",
    "customer success manager",
    "help desk",
    "service desk",
    "call center executive"
],

    "Support": {

        "Customer Service": {
            "aliases": ["customer service"],
            "importance": "Core",
        },

        "CRM": {
            "aliases": ["crm"],
            "importance": "Core",
        },

        "Ticketing System": {
            "aliases": ["zendesk","freshdesk","ticketing system"],
            "importance": "High",
        },

        "Communication": {
            "aliases": ["communication skills"],
            "importance": "High",
        }

    }

},

# =====================================================
# GENERAL MANAGEMENT
# =====================================================

"General Management": {

    "keywords": [
    "operations manager",
    "general manager",
    "business manager",
    "management trainee",
    "operations executive",
    "business operations",
    "team leader",
    "department manager",
    "branch manager",
    "operations head"
],

    "Management": {

        "Leadership": {
            "aliases": ["leadership"],
            "importance": "Core",
        },

        "Strategic Planning": {
            "aliases": ["strategic planning"],
            "importance": "Core",
        },

        "Decision Making": {
            "aliases": ["decision making"],
            "importance": "High",
        },

        "Team Management": {
            "aliases": ["team management"],
            "importance": "High",
        }

    }

},
# =====================================================
# COMMON PROFESSIONAL SKILLS
# Used across all professions
# =====================================================

"Common Professional Skills": {

    "keywords": [
        "communication",
        "leadership",
        "teamwork",
        "problem solving",
        "critical thinking",
        "time management",
        "presentation",
        "decision making",
        "adaptability",
        "collaboration"
    ],

    "Communication": {

        "Communication Skills": {
            "aliases": [
                "communication",
                "communication skills",
                "verbal communication",
                "written communication"
            ],
            "importance": "Core",
        },

        "Presentation Skills": {
            "aliases": [
                "presentation",
                "presentation skills",
                "public speaking"
            ],
            "importance": "High",
        },

        "Negotiation": {
            "aliases": [
                "negotiation",
                "negotiation skills"
            ],
            "importance": "Medium",
        }

    },

    "Leadership": {

        "Leadership": {
            "aliases": [
                "leadership",
                "leadership skills"
            ],
            "importance": "Core",
        },

        "Team Management": {
            "aliases": [
                "team management",
                "team leadership"
            ],
            "importance": "High",
        },

        "Mentoring": {
            "aliases": [
                "mentoring",
                "coaching"
            ],
            "importance": "Medium",
        }

    },

    "Problem Solving": {

        "Problem Solving": {
            "aliases": [
                "problem solving",
                "problem-solving"
            ],
            "importance": "Core",
        },

        "Critical Thinking": {
            "aliases": [
                "critical thinking"
            ],
            "importance": "High",
        },

        "Analytical Thinking": {
            "aliases": [
                "analytical thinking",
                "analytical skills"
            ],
            "importance": "High",
        }

    },

    "Professional Skills": {

        "Time Management": {
            "aliases": [
                "time management"
            ],
            "importance": "Core",
        },

        "Decision Making": {
            "aliases": [
                "decision making"
            ],
            "importance": "High",
        },

        "Adaptability": {
            "aliases": [
                "adaptability",
                "adaptable"
            ],
            "importance": "High",
        },

        "Creativity": {
            "aliases": [
                "creativity",
                "creative thinking"
            ],
            "importance": "Medium",
        },

        "Collaboration": {
            "aliases": [
                "collaboration",
                "collaborative"
            ],
            "importance": "High",
        },

        "Attention to Detail": {
            "aliases": [
                "attention to detail",
                "detail oriented",
                "detail-oriented"
            ],
            "importance": "Medium",
        }

    }

}
}

# =====================================================
# Helper Functions
# =====================================================

def get_domain_names() -> list:
    """Return all available professional domains."""
    return list(SKILLS_DATABASE.keys())


def get_domain(domain_name: str) -> dict:
    """Return a specific domain."""
    return SKILLS_DATABASE.get(domain_name, {})


def get_domain_keywords(domain_name: str) -> list:
    """Return keywords for a domain."""
    return SKILLS_DATABASE.get(domain_name, {}).get("keywords", [])


def get_importance_weight(level: str) -> int:
    """Return numeric weight for an importance level."""
    return IMPORTANCE_WEIGHTS.get(level, 1)


def get_all_skills(domain_name: str) -> dict:
    """Return all skills in a domain."""

    skills = {}

    domain = SKILLS_DATABASE.get(domain_name, {})

    for category, values in domain.items():

        if category == "keywords":
            continue

        skills.update(values)

    return skills


def get_all_aliases(domain_name: str) -> dict:
    """Return aliases for all skills in a domain."""

    aliases = {}

    skills = get_all_skills(domain_name)

    for skill_name, info in skills.items():
        aliases[skill_name] = info.get("aliases", [])

    return aliases


def get_all_domains() -> dict:
    """Return the complete skills database."""
    return SKILLS_DATABASE


__all__ = [
    "SKILLS_DATABASE",
    "IMPORTANCE_WEIGHTS",
    "get_domain_names",
    "get_domain",
    "get_domain_keywords",
    "get_importance_weight",
    "get_all_skills",
    "get_all_aliases",
    "get_all_domains",
]