from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.auth import router as auth_router

app = FastAPI(title="Resume Matcher API")

# allowing the React frontend (running on a different port) to call this API
# in production you'd lock this down to your actual frontend domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)


@app.get("/")
def health_check():
    return {"status": "Resume Matcher API is running"}
