import React, { useEffect, useRef, useState } from "react";

interface ChatbotProps {
  onClose: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Array<{ text: string; sender: string }>>([]);
  const [visibleMessages, setVisibleMessages] = useState<Array<{ text: string; sender: string }>>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const maxVisibleMessages = 10;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    // Initially load the last few messages
    setVisibleMessages(messages.slice(-maxVisibleMessages));
  }, [messages]);

  useEffect(() => {
    const container = document.querySelector(".messages-container");
    const handleScroll = () => {
      if (container.scrollTop === 0 && !loadingRef.current && messages.length > visibleMessages.length) {
        loadingRef.current = true;
        // Simulate loading older messages
        const moreMessages = messages.slice(-visibleMessages.length - maxVisibleMessages, -visibleMessages.length);
        setVisibleMessages([...moreMessages, ...visibleMessages]);
        loadingRef.current = false;
      }
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [visibleMessages, messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    const userMessage = { text: `Me: ${input}`, sender: "user" };
    const botResponse = { text: `Quack: ${input}`, sender: "bot" };
    setMessages([...messages, userMessage, botResponse]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="chatbot-container bg-gray-800 h-screen flex flex-col relative">
      <div className="chat-header p-4 border-b border-gray-700 flex justify-between items-center">
        <p className="text-lg text-white">Quack Overflow</p>
        <button onClick={onClose} className="close-btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded">
          Close
        </button>
      </div>

      <div className="messages-container overflow-y-auto p-4 flex-grow">
        {visibleMessages.map((message, index) => (
          <div key={index}
               className={`message ${message.sender === "user" ? "bg-cream" : "bg-orange"} my-2 p-2 rounded`}>
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container fixed bottom-12 left-7 right-0 p-0 bg-gray-800">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="input-field flex-grow border-gray-400 px-1 bg-white h-12 rounded-l-lg"
          placeholder="Type your message..."
        />
        <button onClick={handleSubmit} className="send-btn bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 py-3 rounded-r-lg">
          Send
        </button>
      </div>
    </div>
  );
};
