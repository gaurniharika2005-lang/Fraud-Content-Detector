# DeFraud — AI Fraud Detection Platform

DeFraud is a full-stack AI-powered cybersecurity platform designed to detect phishing emails, malicious URLs, credential theft attempts, and AI-generated fraud content in real time. It uses Natural Language Processing and Machine Learning to protect users from modern AI-driven scams.

---

## 🚀 Live Demo

Live Application: https://fraud-content-detector.vercel.app/

---

## 🎥 Demo Video

Watch Project Demo:  
(https://github.com/gaurniharika2005-lang/Fraud-Content-Detector/blob/main/demovid.mp4)

(You can also add YouTube link here if available)

---

## 🛡️ Core Features

### Email Analysis Engine
- Detects phishing emails using trained machine learning model  
- Provides fraud probability score and risk level  
- Identifies social engineering and urgency patterns  

### Web Scanner
- Analyzes URLs to detect malicious or phishing websites  
- Helps users avoid fake or dangerous websites  

### Credential Guard
- Detects credential harvesting attempts  
- Identifies suspicious requests for passwords or sensitive information  

### Media Forensics
- Detects AI-generated and synthetic fraudulent content  
- Helps identify deepfake or AI-generated scam messages  

---

## ⚙️ How It Works

1. User enters suspicious content in the React frontend deployed on Vercel  
2. Frontend sends request to FastAPI backend deployed on Render  
3. Backend processes input using trained ML model  
4. TF-IDF converts text into feature vectors  
5. Logistic Regression model predicts fraud probability  
6. Result returned with confidence score and recommendation  

---

## 🧠 Machine Learning Details

- Model: Logistic Regression  
- Vectorizer: TF-IDF  
- Dataset Size: 82,000 phishing emails  
- Accuracy: 98.18%  
- Library: scikit-learn  

---

## 🛠️ Tech Stack

### Frontend
- React  
- TypeScript  
- Tailwind CSS  
- Vercel Deployment  

### Backend
- Python  
- FastAPI  
- Render Deployment  

### Machine Learning
- scikit-learn  
- TF-IDF Vectorizer  
- Logistic Regression  
- Pandas  
- NumPy  

### Tools
- Git  
- GitHub  

---

## 📂 Project Structure
defraud/
│
├── frontend/
├── backend/
├── model/
├── demo.mp4
├── README.md
└── requirements.txt


---

## 💡 Key Highlights

- Full-stack AI application with frontend, backend, and ML integration  
- Real-time fraud detection system  
- Public deployment with live access  
- Production-ready architecture  
- Handles real-world phishing detection scenarios  

---

## 👤 Author

Niharika Gaur  

GitHub: https://github.com/gaurniharika2005-lang  

---

## ⭐ Future Improvements

- Deep learning model integration  
- Real-time email API scanning  
- Browser extension version  
- Enhanced deepfake detection  

---
