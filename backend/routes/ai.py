from fastapi import APIRouter
from database import get_connection
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@router.post("/plan")
def generate_plan():
    # Get all pending tasks from database
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM tasks WHERE completed = FALSE")
    tasks = cursor.fetchall()
    cursor.close()
    conn.close()

    # If no tasks
    if not tasks:
        return {"plan": "No pending tasks! You're all caught up! 🎉"}

    # Build prompt for Groq
    task_list = ""
    for task in tasks:
        task_list += f"- {task['subject']} (Deadline: {task['deadline']}, Priority: {task['priority']})\n"

    prompt = f"""
    I am a student with these pending tasks:
    {task_list}
    
    Generate a detailed hourly study plan for today to complete these tasks.
    Consider priority and deadlines.
    Format it clearly with times like:
    9:00 AM - 11:00 AM: Study [subject]
    Keep it practical and motivating.
    """

    # Call Groq AI
    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[{"role": "user", "content": prompt}]
    )

    plan = response.choices[0].message.content
    return {"plan": plan}