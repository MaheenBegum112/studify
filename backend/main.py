from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import tasks, ai
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Allow your frontend origin
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(tasks.router)
app.include_router(ai.router)

@app.get("/")
def home():
    return {"message": "Studify Backend is Running! 🚀"}