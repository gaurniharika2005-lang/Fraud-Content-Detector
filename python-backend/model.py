import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score
import pickle

df = pd.read_csv('../ml-model/phishing_email.csv')
df = df[['text_combined', 'label']]
df.columns = ['text', 'label']
df.dropna(inplace=True)

X_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.2, random_state=42)

vectorizer = TfidfVectorizer(ngram_range=(1,2), max_features=5000)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

model = LogisticRegression()
model.fit(X_train_vec, y_train)

print('Accuracy:', accuracy_score(y_test, model.predict(X_test_vec)))
print('F1:', f1_score(y_test, model.predict(X_test_vec)))

pickle.dump(model, open('spam_model.pkl', 'wb'))
pickle.dump(vectorizer, open('vectorizer.pkl', 'wb'))
print('Saved!')


