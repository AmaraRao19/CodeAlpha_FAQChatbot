import json

import nltk
import spacy

from flask import Flask, request, jsonify
from flask_cors import CORS

from nltk.corpus import stopwords

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# ==============================
# NLTK & SpaCy Setup
# ==============================

nltk.download("stopwords")

nlp = spacy.load("en_core_web_sm")

stop_words = set(stopwords.words("english"))


# ==============================
# Flask App
# ==============================

app = Flask(__name__)
CORS(app)


# ==============================
# Load FAQs
# ==============================

def load_faqs():

    with open("faq.json", "r") as file:
        faqs = json.load(file)

    return faqs


# ==============================
# Get All Questions
# ==============================

def get_questions():

    faqs = load_faqs()

    questions = []

    for faq in faqs:
        questions.append(faq["question"])

    return questions


# ==============================
# Text Preprocessing
# ==============================

def preprocess_text(text):

    text = text.lower()

    doc = nlp(text)

    words = []

    for token in doc:

        if token.is_alpha and token.text not in stop_words:
            words.append(token.lemma_)

    return " ".join(words)


# ==============================
# Create TF-IDF Vectors
# ==============================

def create_vectorizer():

    questions = get_questions()

    processed_questions = []

    for question in questions:
        processed_questions.append(preprocess_text(question))

    vectorizer = TfidfVectorizer()

    question_vectors = vectorizer.fit_transform(processed_questions)

    return vectorizer, question_vectors


# ==============================
# Find Best Matching Question
# ==============================

def find_best_match(user_question):

    vectorizer, question_vectors = create_vectorizer()

    processed_question = preprocess_text(user_question)

    user_vector = vectorizer.transform([processed_question])

    similarity = cosine_similarity(user_vector, question_vectors)

    best_match_index = similarity.argmax()

    best_score = similarity[0][best_match_index]

    return best_match_index, best_score


# ==============================
# Get Answer
# ==============================

def get_answer(user_question):

    faqs = load_faqs()

    index, score = find_best_match(user_question)

    print("Similarity Score:", score)

    if score < 0.20:

        return "Sorry! I can only answer questions related to CASE University admissions, programs, scholarships, fee structure, campus facilities, and student services."

    return faqs[index]["answer"]


# ==============================
# Home Route
# ==============================

@app.route("/")
def home():

    return "FAQ Chatbot API is Running Successfully!"


# ==============================
# Chat API
# ==============================

@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    question = data["question"]

    answer = get_answer(question)

    return jsonify({
        "answer": answer
    })


# ==============================
# Run Flask Server
# ==============================

if __name__ == "__main__":
    app.run(debug=True)