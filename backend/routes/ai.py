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

    # prompt = f"""
    # I am a student with these pending tasks:
    # {task_list}
    # Generate a detailed hourly study plan for today.
    # Format it clearly with times like:
    # 9:00 AM - 11:00 AM: Study [subject]
    # """
    prompt = f"""
I am a student with these pending tasks:
{task_list}

Generate a study plan in this EXACT format with no tables:

STUDY PLAN FOR TODAY

9:00 AM - 10:30 AM: [Subject] - [What to do]
10:30 AM - 10:45 AM: Break
10:45 AM - 12:00 PM: [Subject] - [What to do]
12:00 PM - 1:00 PM: Lunch Break
1:00 PM - 2:30 PM: [Subject] - [What to do]

TIPS:
- Tip 1
- Tip 2
- Tip 3

Do not use markdown tables. Use simple time slots only.
"""

    response = client.chat.completions.create(
       model="openai/gpt-oss-20b",
        messages=[{"role": "user", "content": prompt}]
    )

    plan = response.choices[0].message.content
    return JSONResponse(content={"plan": plan})
