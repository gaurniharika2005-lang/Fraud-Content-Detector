from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from risk_engine import calculate_risk
import joblib

model = joblib.load("spam_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScanRequest(BaseModel):
    content: str

@app.get("/")
def root():
    return {"status": "DeFraud API Running"}

@app.post("/analyze")
def analyze(request: ScanRequest):
    vec = vectorizer.transform([request.content])
    prediction = model.predict(vec)[0]
    probability = float(model.predict_proba(vec)[0][1])
    score, risk_level = calculate_risk(probability)

    return {
        "is_phishing": bool(prediction),
        "confidence": score,
        "risk_level": risk_level,
        "explanation": (
            "High probability of AI-generated phishing content. Patterns consistent with social engineering attacks."
            if prediction == 1
            else "Content appears clean. No malicious patterns detected."
        ),
        "sentiment": "Urgent/Threatening" if prediction == 1 else "Neutral",
        "recommended_actions": (
            ["Quarantine immediately", "Block sender domain", "Reset credentials"]
            if prediction == 1
            else ["No action needed", "Mark as safe"]
        )
    }