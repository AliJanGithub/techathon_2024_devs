import React, { useState, useRef } from "react";
import Header from "../components/Header";

function Chat_With_Gemini() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  // const [help,sethelp]=useState('')
  const messagesEndRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!input.trim()) return;

    // sethelp(input) ;

    // Add user question to messages
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    try {
      // Replace with your actual Gemini API integration logic
      const response = await fetch(
        "https://medical-assistant-y09w.onrender.com/api/chat/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: input }),
        }
      );

      const data = await response.json();
      setMessages([
        ...messages,
        { role: "user", content: input },
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...messages,
        { role: "assistant", content: "An error occurred." },
      ]);
    } finally {
      console.log(messages, input);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chat-container bg-gray-200 rounded-lg shadow-md flex flex-col h-screen">
      <Header />
      <div className="chat-messages flex-grow overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message flex items-start ${
              message.role === "user" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <span
              className={`text-sm font-medium ${
                message.role === "user" ? "text-gray-700" : "text-blue-500"
              }`}
            >
              {message.role === "assistant" ? "Gemini:" : "user:"}
            </span>
            <p
              className={`ml-2 text-base ${
                message.role === "user"
                  ? "bg-gray-100 px-4 py-2 rounded-lg"
                  : "bg-blue-100 px-4 py-2 rounded-lg"
              }`}
            >
              {message.content}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex mb-6 px-10 w-90 center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="chat-input flex-grow h-10 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat_With_Gemini;
