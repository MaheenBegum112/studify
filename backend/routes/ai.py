from fastapi import APIRouter
from fastapi.responses import JSONResponse
from groq import Groq
import os
from dotenv import load_dotenv
from database import get_connection

load_dotenv()

router = APIRouter()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@router.post("/plan")
def generate_plan():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM tasks WHERE completed = FALSE")
    pending_tasks = cursor.fetchall()
    cursor.close()
    conn.close()

    if not pending_tasks:
        return JSONResponse(content={"plan": "No pending tasks! You're all caught up! 🎉"})

    task_list = ""
    for task in pending_tasks:
        task_list += f"- {task['subject']} (Deadline: {task['deadline']}, Priority: {task['priority']})\n"

    prompt = f"""
    I am a student with these pending tasks:
    {task_list}
    Generate a detailed hourly study plan for today.
    Format it clearly with times like:
    9:00 AM - 11:00 AM: Study [subject]
    """

    response = client.chat.completions.create(
       model="openai/gpt-oss-20b",
        messages=[{"role": "user", "content": prompt}]
    )

    plan = response.choices[0].message.content
    return JSONResponse(content={"plan": plan})
