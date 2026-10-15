from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Studify API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://studify-black.vercel.app",
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:5174",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app|http://localhost:\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Studify API is running", "status": "healthy"}

@app.get("/health")
def health():
    return {"status": "ok"}

# Include routers
from routes.tasks import router as tasks_router
from routes.ai import router as ai_router

app.include_router(tasks_router)
app.include_router(ai_router)