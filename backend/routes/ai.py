from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from groq import Groq
import os
from dotenv import load_dotenv
from database import get_connection

load_dotenv()

router = APIRouter()

def get_groq_client():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        return None
    return Groq(api_key=api_key)

@router.post("/plan")
def generate_plan():
    conn = None
    cursor = None
    pending_tasks = []
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM tasks WHERE completed = FALSE ORDER BY deadline ASC")
        pending_tasks = cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
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

    if not pending_tasks:
        return JSONResponse(content={"plan": "No pending tasks! You're all caught up! 🎉"})

    task_list = ""
    for task in pending_tasks:
        task_list += f"- {task['subject']} (Deadline: {task['deadline']}, Priority: {task['priority']})\n"

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

    client = get_groq_client()
    if not client:
        return JSONResponse(content={"plan": "AI planner unavailable: GROQ_API_KEY is not configured."})

    try:
        response = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3
        )
        plan = response.choices[0].message.content
        return JSONResponse(content={"plan": plan})
    except Exception as e:
        # Fallback or informative error
        return JSONResponse(
            status_code=500,
            content={"plan": f"Could not generate plan from AI at this moment: {str(e)}"}
        )

@router.post("/notify")
def send_reminder():
    conn = None
    cursor = None
    urgent_tasks = []
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT * FROM tasks 
            WHERE completed = FALSE 
            AND deadline <= DATE_ADD(CURDATE(), INTERVAL 1 DAY)
            ORDER BY deadline ASC
        """)
        urgent_tasks = cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
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

    if not urgent_tasks:
        return {"message": "No urgent tasks! You are all caught up.", "tasks": []}

    message = "⚠️ Studify Reminder!\n\nUrgent tasks due soon:\n"
    for task in urgent_tasks:
        message += f"📌 {task['subject']} - Due: {task['deadline']} ({task['priority']} priority)\n"
    message += "\n📚 Open Studify to plan your day!"

    return {"message": message, "tasks": urgent_tasks}


