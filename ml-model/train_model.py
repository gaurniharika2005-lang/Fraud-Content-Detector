import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score, classification_report
import joblib

# 1️⃣ Load dataset
df = pd.read_csv("phishing_email.csv")

print("Dataset shape:", df.shape)

# Remove missing values
df = df.dropna()

# 2️⃣ Select correct columns
X = df["text_combined"]
y = df["label"]

# 3️⃣ Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 4️⃣ TF-IDF with BIGRAMS (Claude approach upgraded)
vectorizer = TfidfVectorizer(
    ngram_range=(1, 2),   # unigrams + bigrams
    max_features=8000,
    stop_words="english"
)

X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# 5️⃣ Logistic Regression
lr_model = LogisticRegression(max_iter=1000)
lr_model.fit(X_train_vec, y_train)
lr_preds = lr_model.predict(X_test_vec)

print("\n=== Logistic Regression ===")
print("Accuracy:", accuracy_score(y_test, lr_preds))
print("F1 Score:", f1_score(y_test, lr_preds))
print(classification_report(y_test, lr_preds))

# 6️⃣ Random Forest (comparison model)
rf_model = RandomForestClassifier(n_estimators=100)
rf_model.fit(X_train_vec, y_train)
rf_preds = rf_model.predict(X_test_vec)

print("\n=== Random Forest ===")
print("Accuracy:", accuracy_score(y_test, rf_preds))
print("F1 Score:", f1_score(y_test, rf_preds))

# 7️⃣ Save best model (Logistic Regression usually best for text)
joblib.dump(lr_model, "spam_model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

print("\nModel trained and saved successfully!")