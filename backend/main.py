from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import tasks, ai

# Create FastAPI app
app = FastAPI()

# Allow React to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(tasks.router)
app.include_router(ai.router)

# Test route
@app.get("/")
def home():
    return {"message": "Studify Backend is Running! 🚀"}