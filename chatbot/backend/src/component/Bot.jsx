import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { User } from "lucide-react";

const Bot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
     const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/bot/v1/message`,
        { text: input }
      );


      if (res.status === 200) {
       setMessages(prevMessages => [
  ...prevMessages,
  { text: res.data.userMessage, sender: "user" },
  { text: res.data.botMessage, sender: "bot" },
]);

      }
    } catch (error) {
      console.error("Error found:", error);
    }

    setInput("");
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="flex flex-col h-screen bg-linear-to-br from-gray-900 via-black to-purple-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-linear-to-r from-purple-800 via-gray-900 to-black shadow-lg">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400">
          Apna Bhaaii
        </h1>
        <User size={30} className="text-gray-300 hover:text-white cursor-pointer" />
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>Hi, I am <span className="text-pink-400 font-semibold">Apna Bhaiii</span>.</p>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow-md ${
                  msg.sender === "user"
                    ? "bg-linear-to-r from-blue-600 to-indigo-700 text-white self-end ml-auto"
                    : "bg-linear-to-r from-gray-700 to-gray-800 text-gray-100 self-start mr-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="text-sm text-gray-400 italic">Bot is typing...</div>
            )}

            <div ref={messageEndRef} />
          </>
        )}
      </main>

      {/* Input / Footer */}
      <footer className="px-4 py-3 bg-linear-to-r from-gray-800 via-black to-purple-900">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Ask me anything bhaiiii..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-xl transition duration-300"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Bot;