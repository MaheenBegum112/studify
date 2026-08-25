import os
from groq import Groq

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_study_plan(tasks):

    task_text = "\n".join(
        [
            f"""
            Subject: {task.get('subject')}
            Task: {task.get('title')}
            Deadline: {task.get('deadline')}
            Priority: {task.get('priority')}
            """
            for task in tasks
        ]
    )

    prompt = f"""
You are an AI study planner for a student.

Create a practical hourly study plan based on these tasks:

{task_text}

Rules:
- Prioritize tasks with closer deadlines.
- Give higher priority to high-priority tasks.
- Include short breaks.
- Don't create unrealistic study hours.
- Return the plan in a simple readable format.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful AI study planner."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3
    )

    return response.choices[0].message.content 
