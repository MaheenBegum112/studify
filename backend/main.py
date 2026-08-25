from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import tasks, ai

app = FastAPI()

# Fix CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Register routes
app.include_router(tasks.router)
app.include_router(ai.router)

@app.get("/")
def home():
    return {"message": "Studify Backend is Running! 🚀"}