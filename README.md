# 🎓 AI-Powered University FAQ Chatbot

An intelligent University Information Assistant developed as part of the CodeAlpha Artificial Intelligence Internship. The chatbot answers frequently asked university-related questions using Natural Language Processing (NLP) techniques instead of simple keyword matching.

The system preprocesses user queries using **NLTK** and **SpaCy**, converts text into TF-IDF vectors, and identifies the most relevant FAQ using Cosine Similarity. It also includes a modern React-based user interface for a smooth user experience.

---

## 🚀 Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3

### Backend
- Flask
- Python

### Artificial Intelligence & NLP
- NLTK
- SpaCy
- Scikit-learn
- TF-IDF Vectorizer
- Cosine Similarity

---

## ✨ Features

- 🤖 AI-powered University FAQ Chatbot
- 🧠 Natural Language Processing (NLP)
- 🔍 Intelligent Question Matching using TF-IDF & Cosine Similarity
- 📊 Similarity Threshold for Unknown Questions
- 💬 Professional Chat Interface
- 📚 Chat History
- 🗑️ Clear Chat Button
- ⌨️ Send Message using Enter Key
- 📜 Auto-Scrolling Chat Window
- 💡 Suggested Questions
- ⚡ Fast Flask REST API
- 🎓 University Information Assistance

---

## 📂 Project Structure

```text
CodeAlpha_FAQChatbot
│
├── backend
│   ├── app.py
│   ├── faq.json
│   ├── requirements.txt
│   └── venv
│
├── frontend
│   ├── public
│   ├── src
│   ├── package.json
│   └── package-lock.json
│
├── screenshots
│
└── README.md
```

---

## 📸 Screenshots

- Main Chat Interface
- Suggested Questions
- Chat Conversation
- Clear Chat Feature

*(Screenshots are available in the `screenshots` folder.)*

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/AmaraRao19/CodeAlpha_FAQChatbot.git
```

### 2️⃣ Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python app.py
```

### 3️⃣ Frontend Setup

```bash
cd frontend

npm install

npm start
```

The React application will start at:

```
http://localhost:3000
```

The Flask server will run at:

```
http://127.0.0.1:5000
```

---

## 🎯 Future Improvements

- Integration with Large Language Models (LLMs)
- Voice-based Interaction
- Database Integration
- Admin Panel for FAQ Management
- Multi-language Support
- User Authentication
- Live University Data Integration

---

## 👩‍💻 Developer

**Ammarah Tabassum**

BS Computer Science Student

CodeAlpha Artificial Intelligence Intern

---

⭐ If you found this project useful, consider giving it a star on GitHub!
