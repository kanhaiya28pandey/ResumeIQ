from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.analyze import router as analyze_router
from app.history import router as history_router
from app.dashboard import router as dashboard_router
from app.cover_letter import router as cover_letter_router
from app.scan import router as scan_router
from app.auth import router as auth_router

app = FastAPI(title="Resume Matcher API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(analyze_router)
app.include_router(history_router)
app.include_router(dashboard_router)
app.include_router(cover_letter_router)
app.include_router(scan_router)

@app.get("/")
def health_check():
    return {"status": "Resume Matcher API is running"}
