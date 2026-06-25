from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
from emotion import detect_emotion
import os

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {"message": "Emotion AI Backend Running"}

@app.post("/chat")
async def chat(req: ChatRequest):
    emotion = detect_emotion(req.message)

    print("Detected Emotion:", emotion)
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
    {
        "role": "system",
        "content": f"""
You are SoulSync, an emotionally intelligent AI companion.

The user's current emotion is: {emotion}

Respond naturally, warmly, supportively, and emotionally aware.
Avoid robotic replies.
"""
    },
    {
        "role": "user",
        "content": req.message
    }
]
    )

    ai_reply = completion.choices[0].message.content

    return {
        "reply": ai_reply
    }