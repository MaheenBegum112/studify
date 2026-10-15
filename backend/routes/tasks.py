from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from database import get_connection

router = APIRouter()

class Task(BaseModel):
    subject: str
    deadline: str
    priority: str

@router.get("/tasks")
def get_tasks():
    conn = None
    cursor = None
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM tasks ORDER BY completed ASC, deadline ASC, id DESC")
        tasks = cursor.fetchall()
        return tasks
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch tasks: {str(e)}")
    finally:
        if cursor:
            try:
                cursor.close()
            except Exception:
                pass
        if conn:
            try:
                conn.close()
            except Exception:
                pass

@router.post("/tasks")
def add_task(task: Task):
    conn = None
    cursor = None
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO tasks (subject, deadline, priority, completed)
            VALUES (%s, %s, %s, %s)
        """, (task.subject, task.deadline, task.priority, False))

        conn.commit()
        new_id = cursor.lastrowid

        return {
            "message": "Task added! ✅",
            "id": new_id
        }
    except Exception as e:
        if conn:
            try:
                conn.rollback()
            except Exception:
                pass
        raise HTTPException(status_code=500, detail=f"Failed to add task: {str(e)}")
    finally:
        if cursor:
            try:
                cursor.close()
            except Exception:
                pass
        if conn:
            try:
                conn.close()
            except Exception:
                pass

@router.put("/tasks/{task_id}")
def update_task(task_id: int, task: dict):
    conn = None
    cursor = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        completed_val = bool(task.get("completed", False))
        cursor.execute("UPDATE tasks SET completed = %s WHERE id = %s", (completed_val, task_id))
        conn.commit()
        return {"message": "Task updated! ✅"}
    except Exception as e:
        if conn:
            try:
                conn.rollback()
            except Exception:
                pass
        raise HTTPException(status_code=500, detail=f"Failed to update task: {str(e)}")
    finally:
        if cursor:
            try:
                cursor.close()
            except Exception:
                pass
        if conn:
            try:
                conn.close()
            except Exception:
                pass

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    conn = None
    cursor = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM tasks WHERE id = %s", (task_id,))
        conn.commit()
        return {"message": "Task deleted! ✅"}
    except Exception as e:
        if conn:
            try:
                conn.rollback()
            except Exception:
                pass
        raise HTTPException(status_code=500, detail=f"Failed to delete task: {str(e)}")
    finally:
        if cursor:
            try:
                cursor.close()
            except Exception:
                pass
        if conn:
            try:
                conn.close()
            except Exception:
                pass