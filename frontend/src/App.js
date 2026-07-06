import { useRef, useEffect, useState } from "react";
import logo from "./logo.jpg";
import "./App.css";

function App() {

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatHistory");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  // ==========================
  // Clear Chat
  // ==========================

  const clearChat = () => {

    setMessages([]);

    localStorage.removeItem("chatHistory");

  };

  // ==========================
  // Send Question
  // ==========================

  const sendQuestion = async () => {

    if (question.trim() === "") {

      alert("Please enter a question.");

      return;

    }

    setLoading(true);

    try {

      const response = await fetch("http://127.0.0.1:5000/chat", {

        method: "POST",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify({

          question: question

        })

      });

      const data = await response.json();

      const newMessage = {

        user: question,

        bot: data.answer,

        time: new Date().toLocaleTimeString([], {

          hour: "2-digit",

          minute: "2-digit"

        })

      };

      const updatedMessages = [...messages, newMessage];

      setMessages(updatedMessages);

      localStorage.setItem(

        "chatHistory",

        JSON.stringify(updatedMessages)

      );

      setQuestion("");

    }

    catch (error) {

      console.log(error);

      alert("Cannot connect to Flask Server.");

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="App">

      <div className="header">

        <img
          src={logo}
          alt="University Logo"
          className="logo"
        />

        <h1>🎓 Sir Syed CASE Institute of Technology</h1>

        <h3>University Information Assistant</h3>

        <p>

          Ask questions related to admissions,

          scholarships,

          fee structure,

          hostel,

          programs and campus facilities.

        </p>

      </div>

      <div className="suggestions">

        <h4>💡 Suggested Questions</h4>

        <div className="buttons">

          <button
            onClick={() =>
              setQuestion("How can I apply for admission?")
            }
          >
            Admission
          </button>

          <button
            onClick={() =>
              setQuestion("Do you offer scholarships?")
            }
          >
            Scholarships
          </button>

          <button
            onClick={() =>
              setQuestion("What programs do you offer?")
            }
          >
            Programs
          </button>

          <button
            onClick={() =>
              setQuestion("Is hostel available?")
            }
          >
            Hostel
          </button>

          <button
            onClick={() =>
              setQuestion("What is the fee structure?")
            }
          >
            Fee Structure
          </button>

        </div>

      </div>

      <textarea

        placeholder="Ask anything about CASE University..."

        rows="5"

        value={question}

        onChange={(e) => setQuestion(e.target.value)}

        onKeyDown={(e) => {

          if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            sendQuestion();

          }

        }}

      />

      <br /><br />

      <button

        onClick={sendQuestion}

        disabled={loading}

      >

        {loading ? "Thinking..." : "Ask Question"}

      </button>

      <button

        className="clear-btn"

        onClick={clearChat}

      >

        🗑 Clear Chat

      </button>

      <h2>Conversation</h2>

      {

        loading ?

          <p>🤖 Thinking...</p>

          :

          <div className="chat-container">

            {

              messages.map((msg, index) => (

                <div key={index}>

                  <div className="user">

                    <strong>You</strong>

                    <p>{msg.user}</p>

                    <small>{msg.time}</small>

                  </div>

                  <div className="bot">

                    <strong>University Bot</strong>

                    <p>{msg.bot}</p>

                    <small>{msg.time}</small>

                  </div>

                </div>

              ))

            }

            <div ref={chatEndRef}></div>

          </div>

      }

    </div>

  );

}

export default App;