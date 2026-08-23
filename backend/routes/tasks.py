from fastapi import APIRouter

router = APIRouter()

@router.get("/tasks")
def get_tasks():
    return {"message": "Tasks route working!"}