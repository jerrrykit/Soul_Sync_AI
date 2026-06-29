import os
import requests

HF_TOKEN = os.getenv("HF_TOKEN")

API_URL = "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base"

headers = {
    "Authorization": f"Bearer {HF_TOKEN}"
}

def detect_emotion(text):
    response = requests.post(
        API_URL,
        headers=headers,
        json={"inputs": text}
    )

    result = response.json()

    if isinstance(result, list):
        emotions = result[0]
        highest = max(emotions, key=lambda x: x["score"])
        return highest["label"]

    return "neutral"