from transformers import pipeline

classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=None
)

def detect_emotion(text):

    results = classifier(text)[0]

    highest = max(results, key=lambda x: x['score'])

    return highest['label']