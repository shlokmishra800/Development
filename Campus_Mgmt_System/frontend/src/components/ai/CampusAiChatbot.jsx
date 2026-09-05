import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, User, Minimize2 } from 'lucide-react';
import api from '../../services/api';

const CampusAiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your CampusConnect AI Assistant. Ask me about your timetable, attendance, pending assignments, or upcoming exams!'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    'When is my next class?',
    'What is my attendance?',
    'Do I have pending assignments?',
    'When is my exam?'
  ];

  const handleSend = async (textToSend) => {
    const prompt = textToSend || input;
    if (!prompt.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: prompt }];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await api.post(`/public/ai-chatbot?prompt=${encodeURIComponent(prompt)}`);
      setMessages([...newMessages, { sender: 'bot', text: response.data.reply }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { sender: 'bot', text: 'Sorry, I am having trouble connecting to the campus server right now. Please try again shortly.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 via-yellow-400 to-emerald-600 text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-200 group"
        >
          <div className="p-1 rounded-full bg-white/20">
            <Bot className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm tracking-wide">Campus AI</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-300"></span>
          </span>
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col h-[480px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Chat Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-500 via-yellow-400 to-amber-500 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-white/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  Campus AI Assistant
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                </h4>
                <p className="text-[11px] text-white/90">Smart Academic Guide</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className="p-2 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp)}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 whitespace-nowrap hover:border-emerald-500 transition-colors shrink-0"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-zinc-800 dark:bg-zinc-700 text-white'
                      : 'bg-emerald-500 text-white'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-none border border-transparent dark:border-zinc-700/60'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-zinc-400 italic">
                <Bot className="w-4 h-4 animate-bounce" />
                <span>Thinking...</span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Campus AI..."
              className="flex-1 px-3 py-2 text-xs bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-zinc-800 dark:text-zinc-100"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2 rounded-xl bg-gradient-to-r from-emerald-500 to-yellow-500 text-white disabled:opacity-50 hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CampusAiChatbot;
