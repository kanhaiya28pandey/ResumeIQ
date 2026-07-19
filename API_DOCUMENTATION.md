# API_DOCUMENTATION.md

# ResumeIQ REST API Documentation

**Project:** ResumeIQ – AI-Powered Resume Analyzer & ATS Optimizer

**Version:** 1.0

**Backend Framework:** FastAPI

**Database:** MongoDB

**Authentication:** JSON Web Token (JWT)

**Author:** Kanhaiya Pandey

---

# Table of Contents

1. Introduction
2. API Overview
3. Base URL
4. Authentication
5. Request & Response Format
6. Authentication APIs
7. Resume Analysis APIs
8. Dashboard APIs
9. History APIs
10. Profile APIs
11. HTTP Status Codes
12. Error Handling
13. API Security
14. Testing with Postman

---

# 1. Introduction

This document describes all REST APIs provided by the ResumeIQ backend.

The APIs allow frontend applications to:

- Register users
- Authenticate users
- Upload resumes
- Analyze resumes
- Generate AI suggestions
- Generate cover letters
- View dashboard analytics
- Access scan history
- Manage user profiles

All APIs return JSON responses.

---

# 2. API Overview

The backend follows REST architecture.

Main API modules include:

```
Authentication

Resume Analysis

Dashboard

History

Profile
```

Most endpoints require JWT authentication.

---

# 3. Base URL

## Development

```
http://localhost:8000
```

## Production

Replace with your deployed backend URL.

Example:

```
https://your-backend-url.com
```

---

# 4. Authentication

ResumeIQ uses JSON Web Tokens (JWT).

After successful login, the backend returns an access token.

Example:

```
Authorization: Bearer <JWT_TOKEN>
```

Every protected endpoint requires this header.

---

# 5. Request & Response Format

## Request

Requests generally use JSON.

Example

```json
{
    "email":"user@example.com",
    "password":"Password123"
}
```

---

## Success Response

```json
{
    "success": true,
    "message":"Operation completed successfully."
}
```

---

## Error Response

```json
{
    "success": false,
    "message":"Invalid credentials."
}
```

---

# Summary

ResumeIQ follows a consistent REST API design using JSON request and response bodies. Authentication is implemented using JWT tokens, ensuring secure access to protected resources. The following sections document each API endpoint, including request parameters, authentication requirements, sample responses, and possible error codes.

# 6. Authentication APIs

The Authentication module manages user registration, login, password recovery, OTP verification, and password updates.

---

# 6.1 User Registration

## Endpoint

```
POST /auth/register
```

## Description

Creates a new user account.

## Authentication

Not Required

## Request Body

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password@123"
}
```

## Success Response (201)

```json
{
    "success": true,
    "message": "User registered successfully."
}
```

## Error Responses

### 400 Bad Request

```json
{
    "success": false,
    "message": "Invalid input."
}
```

### 409 Conflict

```json
{
    "success": false,
    "message": "Email already exists."
}
```

---

# 6.2 User Login

## Endpoint

```
POST /auth/login
```

## Description

Authenticates a registered user and returns a JWT access token.

## Authentication

Not Required

## Request Body

```json
{
    "email": "john@example.com",
    "password": "Password@123"
}
```

## Success Response (200)

```json
{
    "success": true,
    "message": "Login successful.",
    "token": "<JWT_TOKEN>",
    "user": {
        "id": "665ab1...",
        "name": "John Doe",
        "email": "john@example.com"
    }
}
```

## Error Responses

### 401 Unauthorized

```json
{
    "success": false,
    "message": "Invalid email or password."
}
```

---

# 6.3 Forgot Password (Request OTP)

## Endpoint

```
POST /auth/forgot-password
```

## Description

Generates and sends a One-Time Password (OTP) to the registered email address.

## Authentication

Not Required

## Request Body

```json
{
    "email": "john@example.com"
}
```

## Success Response (200)

```json
{
    "success": true,
    "message": "OTP sent successfully."
}
```

## Error Responses

### 404 Not Found

```json
{
    "success": false,
    "message": "Email not registered."
}
```

---

# 6.4 Verify OTP

## Endpoint

```
POST /auth/verify-otp
```

## Description

Validates the OTP sent to the user's email.

## Authentication

Not Required

## Request Body

```json
{
    "email": "john@example.com",
    "otp": "482915"
}
```

## Success Response (200)

```json
{
    "success": true,
    "message": "OTP verified successfully."
}
```

## Error Responses

### 400 Bad Request

```json
{
    "success": false,
    "message": "Invalid or expired OTP."
}
```

---

# 6.5 Reset Password

## Endpoint

```
POST /auth/reset-password
```

## Description

Allows users to set a new password after successful OTP verification.

## Authentication

Not Required

## Request Body

```json
{
    "email": "john@example.com",
    "newPassword": "NewPassword@123"
}
```

## Success Response (200)

```json
{
    "success": true,
    "message": "Password reset successfully."
}
```

## Error Responses

### 400 Bad Request

```json
{
    "success": false,
    "message": "Password does not meet security requirements."
}
```

---

# 6.6 Change Password

## Endpoint

```
POST /auth/change-password/request-otp
```

## Description

Generates and sends an OTP to the authenticated user's registered email before changing the password.

## Authentication

Required (JWT)

## Request Header

```
Authorization: Bearer <JWT_TOKEN>
```

## Success Response (200)

```json
{
    "success": true,
    "message": "OTP sent successfully."
}
```

---

## Endpoint

```
POST /auth/change-password
```

## Description

Changes the user's password after successful OTP verification.

## Authentication

Required (JWT)

## Request Body

```json
{
    "otp": "482915",
    "newPassword": "NewPassword@123"
}
```

## Success Response (200)

```json
{
    "success": true,
    "message": "Password changed successfully."
}
```

## Error Responses

### 401 Unauthorized

```json
{
    "success": false,
    "message": "Invalid or expired token."
}
```

### 400 Bad Request

```json
{
    "success": false,
    "message": "Invalid OTP."
}
```

---

# Authentication Flow

```text
User Registration
        │
        ▼
Account Created
        │
        ▼
Login
        │
        ▼
Receive JWT Token
        │
        ▼
Access Protected APIs
        │
        ▼
────────────────────────────
Forgot Password
        │
        ▼
Request OTP
        │
        ▼
Verify OTP
        │
        ▼
Reset Password
        │
        ▼
Login with New Password
────────────────────────────
Authenticated User
        │
        ▼
Request Change Password OTP
        │
        ▼
Verify OTP
        │
        ▼
Change Password
        │
        ▼
Login Again
```

---

# Summary

The Authentication module provides secure user management through JWT-based authentication, BCrypt password hashing, and OTP verification. It supports user registration, login, password recovery, and authenticated password changes while ensuring that only authorized users can access protected resources.

# 7. Resume Analysis APIs

The Resume Analysis module enables users to upload resumes, compare them with job descriptions, calculate ATS scores, generate AI-powered recommendations, and create personalized cover letters.

All endpoints in this module require JWT authentication.

---

# 7.1 Analyze Resume

## Endpoint

```
POST /resume/analyze
```

## Description

Uploads a resume along with a job description and performs a complete AI-powered analysis.

The analysis includes:

- Resume Parsing
- Skill Extraction
- Semantic Matching
- ATS Evaluation
- AI Suggestions
- Cover Letter Generation

## Authentication

Required (JWT)

## Request Header

```
Authorization: Bearer <JWT_TOKEN>
```

## Content Type

```
multipart/form-data
```

## Request Parameters

| Parameter | Type | Required | Description |
|------------|------|----------|-------------|
| resume | File | Yes | Resume (PDF/DOCX) |
| jobTitle | String | Yes | Target job title |
| company | String | No | Company name |
| jobDescription | String | Yes | Job description |

---

## Sample Request

```
resume = resume.pdf

jobTitle = Backend Java Developer

company = Google

jobDescription = Looking for a Java Backend Developer with Spring Boot, SQL, REST APIs and Microservices experience.
```

---

## Success Response (200)

```json
{
  "success": true,
  "message": "Resume analyzed successfully.",
  "data": {
    "matchScore": 88,
    "atsScore": 91,
    "atsGrade": "A",
    "overallVerdict": "Excellent Match"
  }
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "Resume file is required."
}
```

### 415 Unsupported Media Type

```json
{
  "success": false,
  "message": "Unsupported file format."
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Invalid JWT token."
}
```

---

# 7.2 Resume Parsing

## Description

After uploading, the backend extracts text from the resume.

Supported formats:

- PDF
- DOCX

Extracted sections include:

- Contact Information
- Summary
- Skills
- Education
- Experience
- Projects
- Certifications

---

## Sample Parsed Response

```json
{
  "resumeData": {
    "name": "John Doe",
    "email": "john@example.com",
    "skills": [
      "Java",
      "Spring Boot",
      "SQL",
      "React"
    ],
    "education": [
      "Master of Computer Applications"
    ]
  }
}
```

---

# 7.3 ATS Evaluation

## Description

Calculates ATS compatibility using multiple evaluation criteria.

Evaluation considers:

- Resume Sections
- Keywords
- Skills
- Experience
- Education
- Formatting
- Contact Information

---

## Sample Response

```json
{
  "atsScore": 91,
  "atsGrade": "A",
  "atsBreakdown": {
    "sections": 20,
    "skills": 25,
    "keywords": 22,
    "experience": 15,
    "education": 9
  }
}
```

---

# 7.4 Skill Matching

## Description

Compares resume skills with job description requirements.

Categories include:

- Matching Skills
- Missing Skills
- Additional Skills

---

## Sample Response

```json
{
  "matchedSkills": [
    "Java",
    "REST API",
    "SQL"
  ],
  "missingSkills": [
    "Docker",
    "Kubernetes"
  ],
  "additionalSkills": [
    "React",
    "Node.js"
  ]
}
```

---

# 7.5 Semantic Match Score

## Description

Calculates semantic similarity between the resume and the job description using sentence embeddings.

Unlike traditional keyword matching, semantic matching evaluates contextual similarity.

---

## Sample Response

```json
{
  "matchScore": 88,
  "overallVerdict": "Excellent Match"
}
```

---

# 7.6 AI Suggestions

## Description

Generates personalized recommendations using Google Gemini AI.

Recommendations include:

- Resume Improvements
- Missing Skills
- Strong Sections
- Weak Sections
- Professional Advice

---

## Sample Response

```json
{
  "summary": "Your resume demonstrates strong backend development skills.",

  "strengths": [
    "Good technical skill coverage",
    "Well-structured experience section"
  ],

  "weaknesses": [
    "Missing measurable achievements"
  ],

  "suggestions": [
    "Add project impact metrics.",
    "Highlight leadership experience."
  ]
}
```

---

# 7.7 Cover Letter Generation

## Description

Generates a customized cover letter based on:

- Resume
- Job Title
- Company
- Job Description

---

## Sample Response

```json
{
  "coverLetter": "Dear Hiring Manager,\n\nI am excited to apply for the Backend Java Developer position..."
}
```

---

# 7.8 Complete Analysis Response

Example of the complete response returned after successful analysis.

```json
{
  "success": true,
  "data": {

    "matchScore": 88,

    "atsScore": 91,

    "atsGrade": "A",

    "overallVerdict": "Excellent Match",

    "resumeData": {},

    "analysis": {

      "summary": "",

      "strengths": [],

      "weaknesses": [],

      "suggestions": []

    },

    "matchedSkills": [],

    "missingSkills": [],

    "coverLetter": ""
  }
}
```

---

# Resume Analysis Workflow

```text
Upload Resume
      │
      ▼
Validate File
      │
      ▼
Extract Resume Text
      │
      ▼
Extract Resume Sections
      │
      ▼
Extract Skills
      │
      ▼
Semantic Matching
      │
      ▼
ATS Evaluation
      │
      ▼
Google Gemini AI
      │
      ▼
Generate Cover Letter
      │
      ▼
Save Analysis
      │
      ▼
Return JSON Response
```

---

# Summary

The Resume Analysis module is the core feature of ResumeIQ. It combines document parsing, ATS evaluation, semantic similarity analysis, and Google Gemini AI to generate comprehensive resume insights. The analysis results are securely stored and made available for dashboard analytics and history tracking.

# 8. Dashboard APIs

The Dashboard module provides users with an overview of their resume analysis performance through statistics and visual analytics.

All Dashboard APIs require JWT authentication.

---

# 8.1 Get Dashboard Statistics

## Endpoint

```
GET /dashboard
```

## Description

Returns overall dashboard statistics for the authenticated user.

## Authentication

Required (JWT)

## Request Header

```
Authorization: Bearer <JWT_TOKEN>
```

---

## Success Response (200)

```json
{
    "success": true,
    "data": {
        "totalScans": 18,
        "averageMatchScore": 82,
        "averageATSScore": 86,
        "highestMatchScore": 96,
        "highestATSScore": 98
    }
}
```

---

## Error Response

### 401 Unauthorized

```json
{
    "success": false,
    "message": "Unauthorized access."
}
```

---

# 8.2 Dashboard Analytics

## Endpoint

```
GET /dashboard/analytics
```

## Description

Returns analytics data used for charts and visualizations.

## Authentication

Required

---

## Success Response

```json
{
    "success": true,
    "data": {
        "matchTrend": [],
        "atsDistribution": [],
        "domainStatistics": [],
        "recentPerformance": []
    }
}
```

---

# 8.3 Recent Resume Activity

## Endpoint

```
GET /dashboard/recent
```

## Description

Returns the most recent resume analyses.

## Authentication

Required

---

## Success Response

```json
{
    "success": true,
    "data": [
        {
            "scanId": "665ab...",
            "jobTitle": "Backend Developer",
            "company": "Google",
            "matchScore": 91,
            "atsScore": 95,
            "analysisDate": "2026-07-18"
        }
    ]
}
```

---

# Dashboard Workflow

```text
Dashboard Request
        │
        ▼
Verify JWT
        │
        ▼
Fetch User History
        │
        ▼
Aggregate Statistics
        │
        ▼
Generate Analytics
        │
        ▼
Return Dashboard JSON
```

---

# 9. History APIs

The History module allows users to access previous resume analyses.

---

# 9.1 Get Scan History

## Endpoint

```
GET /history
```

## Description

Returns all resume analyses belonging to the authenticated user.

## Authentication

Required

---

## Success Response

```json
{
    "success": true,
    "data": [
        {
            "scanId": "665ab...",
            "jobTitle": "Java Developer",
            "company": "Amazon",
            "matchScore": 88,
            "atsScore": 90,
            "overallVerdict": "Excellent Match",
            "analysisDate": "2026-07-15"
        }
    ]
}
```

---

# 9.2 Get Scan Details

## Endpoint

```
GET /history/{scanId}
```

## Description

Returns the complete analysis report of a specific resume.

## Authentication

Required

---

## Path Parameter

| Parameter | Type | Description |
|------------|------|-------------|
| scanId | String | Resume Analysis ID |

---

## Success Response

```json
{
    "success": true,
    "data": {
        "matchScore": 88,
        "atsScore": 91,
        "atsGrade": "A",
        "overallVerdict": "Excellent Match",
        "analysis": {},
        "coverLetter": "",
        "resumeData": {}
    }
}
```

---

# 9.3 Delete Analysis

## Endpoint

```
DELETE /history/{scanId}
```

## Description

Deletes a previously saved resume analysis.

## Authentication

Required

---

## Success Response

```json
{
    "success": true,
    "message": "Analysis deleted successfully."
}
```

---

## Error Response

### 404 Not Found

```json
{
    "success": false,
    "message": "Analysis not found."
}
```

---

# 9.4 Search History

## Endpoint

```
GET /history/search
```

## Description

Searches previous resume analyses.

## Query Parameters

| Parameter | Type | Description |
|------------|------|-------------|
| keyword | String | Job title or company |
| page | Integer | Page number |
| limit | Integer | Number of records |

---

## Example Request

```
GET /history/search?keyword=Java&page=1&limit=10
```

---

## Success Response

```json
{
    "success": true,
    "data": [
        {
            "jobTitle": "Java Backend Developer",
            "company": "Microsoft",
            "matchScore": 90
        }
    ]
}
```

---

# 9.5 Filter History

## Endpoint

```
GET /history/filter
```

## Description

Filters analyses using score ranges or dates.

---

## Query Parameters

| Parameter | Description |
|------------|-------------|
| fromDate | Start date |
| toDate | End date |
| minATS | Minimum ATS score |
| maxATS | Maximum ATS score |

---

## Example

```
GET /history/filter?minATS=80&maxATS=100
```

---

## Success Response

```json
{
    "success": true,
    "data": []
}
```

---

# History Workflow

```text
History Request
        │
        ▼
Verify JWT
        │
        ▼
Fetch User Analyses
        │
        ▼
Apply Search / Filter
        │
        ▼
Return Results
```

---

# Summary

The Dashboard and History modules provide users with comprehensive insights into their resume analyses. Dashboard APIs aggregate performance metrics and visual analytics, while History APIs enable users to retrieve, search, filter, view, and delete previous analyses. These modules help users monitor progress and continuously improve their resumes over time.

# 10. Profile APIs

The Profile module enables authenticated users to view and manage their account information and application preferences.

All Profile APIs require JWT authentication.

---

# 10.1 Get User Profile

## Endpoint

```
GET /profile
```

## Description

Returns the authenticated user's profile information.

## Authentication

Required (JWT)

## Request Header

```
Authorization: Bearer <JWT_TOKEN>
```

---

## Success Response (200)

```json
{
    "success": true,
    "data": {
        "id": "665ab1...",
        "name": "John Doe",
        "email": "john@example.com",
        "createdAt": "2026-06-01T10:20:00Z"
    }
}
```

---

## Error Response

### 401 Unauthorized

```json
{
    "success": false,
    "message": "Unauthorized access."
}
```

---

# 10.2 Update Profile

## Endpoint

```
PUT /profile
```

## Description

Updates the authenticated user's profile information.

## Authentication

Required

---

## Request Body

```json
{
    "name": "John Smith"
}
```

---

## Success Response

```json
{
    "success": true,
    "message": "Profile updated successfully."
}
```

---

# 10.3 Update Preferences

## Endpoint

```
PUT /profile/preferences
```

## Description

Updates application preferences for the authenticated user.

## Authentication

Required

---

## Request Body

```json
{
    "theme": "dark",
    "showSuggestions": true,
    "confirmLogout": true
}
```

---

## Success Response

```json
{
    "success": true,
    "message": "Preferences updated successfully."
}
```

---

# 10.4 Get Preferences

## Endpoint

```
GET /profile/preferences
```

## Description

Returns the current user preferences.

---

## Success Response

```json
{
    "success": true,
    "data": {
        "theme": "dark",
        "showSuggestions": true,
        "confirmLogout": true
    }
}
```

---

# 10.5 Delete Account

## Endpoint

```
DELETE /profile
```

## Description

Deletes the authenticated user's account along with all associated resume analyses.

## Authentication

Required

---

## Success Response

```json
{
    "success": true,
    "message": "Account deleted successfully."
}
```

---

## Error Response

### 404 Not Found

```json
{
    "success": false,
    "message": "User not found."
}
```

---

# Profile Workflow

```text
User Opens Profile
        │
        ▼
Verify JWT
        │
        ▼
Fetch User Data
        │
        ▼
Return Profile Information
        │
        ▼
User Updates Details
        │
        ▼
Validate Request
        │
        ▼
Update MongoDB
        │
        ▼
Return Success Response
```

---

# 11. Standard API Response Format

All ResumeIQ APIs follow a consistent JSON response structure.

---

## Successful Response

```json
{
    "success": true,
    "message": "Operation completed successfully.",
    "data": {}
}
```

---

## Error Response

```json
{
    "success": false,
    "message": "Something went wrong."
}
```

---

## Validation Error Response

```json
{
    "success": false,
    "message": "Validation failed.",
    "errors": [
        {
            "field": "email",
            "message": "Email is required."
        }
    ]
}
```

---

# 12. HTTP Status Codes

ResumeIQ uses standard HTTP status codes.

| Status Code | Meaning |
|--------------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 415 | Unsupported Media Type |
| 422 | Validation Error |
| 500 | Internal Server Error |

---

# 13. Error Handling

The backend returns meaningful error messages while preventing exposure of sensitive implementation details.

Common error scenarios include:

- Invalid credentials
- Missing authentication token
- Expired JWT token
- Invalid OTP
- Unsupported file type
- Missing required fields
- Resource not found
- Duplicate email
- Database connection failure
- AI service unavailable

---

## Example Error Response

```json
{
    "success": false,
    "message": "Invalid or expired JWT token."
}
```

---

## Validation Example

```json
{
    "success": false,
    "message": "Validation failed.",
    "errors": [
        {
            "field": "password",
            "message": "Password must contain at least 8 characters."
        }
    ]
}
```

---

## Internal Server Error Example

```json
{
    "success": false,
    "message": "Internal server error."
}
```

---

# Summary

The Profile module enables authenticated users to manage their personal information and application preferences securely. ResumeIQ follows a standardized API response format, uses appropriate HTTP status codes, and implements structured error handling to provide a consistent and reliable developer experience.

# 14. API Security

Security is a fundamental aspect of the ResumeIQ backend. The APIs are designed to protect user accounts, uploaded resumes, and analysis data from unauthorized access.

The following security mechanisms are implemented:

- JWT-based Authentication
- BCrypt Password Hashing
- OTP Verification
- Protected API Endpoints
- Input Validation
- Environment Variables
- Secure Password Reset Flow

---

## JWT Authentication

All protected endpoints require a valid JWT access token.

Example:

```
Authorization: Bearer <JWT_TOKEN>
```

If the token is missing, invalid, or expired, the server returns:

```http
401 Unauthorized
```

---

## Password Security

Passwords are never stored in plain text.

Before saving a password:

```
User Password
      │
      ▼
BCrypt Hashing
      │
      ▼
MongoDB
```

Only hashed passwords are stored in the database.

---

## OTP Security

Password reset and password change operations require OTP verification.

OTP characteristics:

- Generated securely
- Sent to the registered email
- Short validity period
- Single-use

---

## Input Validation

Every API validates incoming data before processing.

Examples include:

- Email format
- Password strength
- Required fields
- File type
- File existence

Invalid requests are rejected with appropriate HTTP status codes.

---

## Environment Variables

Sensitive configuration values are never hardcoded.

Examples:

```
MONGODB_URI

JWT_SECRET

GEMINI_API_KEY

EMAIL_USERNAME

EMAIL_PASSWORD
```

This improves security and simplifies deployment.

---

# 15. Request Lifecycle

The following diagram illustrates the lifecycle of a typical API request.

```text
Client Request
      │
      ▼
FastAPI Router
      │
      ▼
Authentication Middleware
      │
      ▼
Input Validation
      │
      ▼
Business Logic
      │
      ▼
Database / AI Service
      │
      ▼
Response Formatting
      │
      ▼
JSON Response
```

Every request follows this pipeline to ensure security, consistency, and maintainability.

---

# 16. Authentication Flow

```text
Register
     │
     ▼
Login
     │
     ▼
Receive JWT
     │
     ▼
Store Token
     │
     ▼
Protected Request
     │
     ▼
JWT Verification
     │
     ▼
API Response
```

---

# 17. Resume Analysis API Flow

```text
Upload Resume
       │
       ▼
Validate Request
       │
       ▼
Extract Resume Text
       │
       ▼
Extract Resume Sections
       │
       ▼
Skill Extraction
       │
       ▼
Semantic Matching
       │
       ▼
ATS Evaluation
       │
       ▼
Google Gemini AI
       │
       ▼
Generate Cover Letter
       │
       ▼
Store Result
       │
       ▼
Return Response
```

---

# 18. Best Practices

The ResumeIQ backend follows modern REST API development practices.

### RESTful API Design

- Resource-oriented endpoints
- Appropriate HTTP methods
- Standard HTTP status codes

---

### Consistent JSON Responses

Every endpoint follows a standardized response structure.

---

### Secure Authentication

Protected APIs require JWT authentication.

---

### Error Handling

Meaningful error messages are returned without exposing internal implementation details.

---

### Modular Architecture

Business logic is separated from routing, database operations, and AI services to improve maintainability.

---

### Validation

All incoming requests are validated before processing.

---

# 19. Performance Considerations

To maintain responsive API performance, the backend incorporates several optimization strategies.

### Backend Optimizations

- Efficient MongoDB queries
- Modular service architecture
- Reusable utility functions
- Optimized AI request handling
- Structured API responses

---

### Future Optimizations

Potential improvements include:

- Response caching
- Background task processing
- Request queuing
- Load balancing
- Horizontal scaling

---

# 20. Rate Limiting

The current version does not implement request rate limiting.

For production deployments, the following enhancements are recommended:

- Rate limiting per IP
- Rate limiting per user account
- Request throttling
- Abuse detection
- API usage monitoring

These measures help protect the application against excessive or malicious requests.

---

# 21. Testing with Postman

All APIs can be tested using Postman.

Typical testing workflow:

```text
Register User
      │
      ▼
Login
      │
      ▼
Copy JWT Token
      │
      ▼
Authorize Requests
      │
      ▼
Upload Resume
      │
      ▼
Analyze Resume
      │
      ▼
View Dashboard
      │
      ▼
View History
```

---

## Recommended Test Cases

Authentication

- Register
- Login
- Invalid Login
- Forgot Password
- Reset Password
- Change Password

Resume Analysis

- Upload PDF
- Upload DOCX
- Invalid File
- Missing Job Description

Dashboard

- Retrieve Statistics
- Retrieve Analytics

History

- View History
- View Details
- Delete Analysis

Profile

- Get Profile
- Update Profile
- Update Preferences

---

# 22. API Versioning

The current API is Version 1.

Recommended URL format:

```
/api/v1/
```

Example:

```
POST /api/v1/auth/login

GET /api/v1/dashboard

POST /api/v1/resume/analyze
```

API versioning allows future updates while maintaining backward compatibility.

---

# 23. Future Improvements

Possible enhancements for future API versions include:

- Resume Builder APIs
- AI Interview APIs
- Job Recommendation APIs
- LinkedIn Integration APIs
- Cloud Storage APIs
- Notification APIs
- Recruiter Portal APIs
- Admin Management APIs
- Resume Version Control APIs
- Multi-language Support

---

# 24. Conclusion

The ResumeIQ REST API provides a secure, scalable, and modular backend for AI-powered resume analysis.

The API integrates authentication, resume parsing, semantic similarity analysis, ATS evaluation, AI-generated recommendations, dashboard analytics, and history management into a unified platform.

By following REST principles, JWT-based authentication, standardized response structures, and modular architecture, the backend provides a reliable foundation for frontend applications and future enhancements.

---

# Appendix A – HTTP Methods

| Method | Purpose |
|----------|----------|
| GET | Retrieve data |
| POST | Create or process data |
| PUT | Update existing data |
| PATCH | Partially update data |
| DELETE | Remove data |

---

# Appendix B – Content Types

| Content Type | Usage |
|--------------|-------|
| application/json | Standard API requests |
| multipart/form-data | Resume file upload |

---

# Appendix C – Common Headers

## Authorization

```
Authorization: Bearer <JWT_TOKEN>
```

## Content-Type

```
Content-Type: application/json
```

or

```
Content-Type: multipart/form-data
```

---

# Document End

**Document:** API_DOCUMENTATION.md

**Version:** 1.0

**API Style:** REST

**Authentication:** JWT

**Framework:** FastAPI

**Database:** MongoDB

**Prepared By:** Kanhaiya Pandey

**Institution:** SRM Institute of Science and Technology

**Academic Program:** Master of Computer Applications (MCA)