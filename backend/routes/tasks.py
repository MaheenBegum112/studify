from fastapi import APIRouter
from pydantic import BaseModel
from database import get_connection

router = APIRouter()

class Task(BaseModel):
    subject: str
    deadline: str
    priority: str

@router.get("/tasks")
def get_tasks():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()
    cursor.close()
    conn.close()
    return tasks

@router.post("/tasks")
def add_task(task: Task):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO tasks (subject, deadline, priority, completed)
        VALUES (%s, %s, %s, %s)
    """, (task.subject, task.deadline, task.priority, False))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Task added! ✅"}

@router.put("/tasks/{task_id}")
def update_task(task_id: int, task: dict):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE tasks SET completed = %s WHERE id = %s",
        (task["completed"], task_id))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Task updated! ✅"}

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id = %s", (task_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Task deleted! ✅"}