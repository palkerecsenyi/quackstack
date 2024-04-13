import React, { useEffect, useRef, useState } from "react";

interface ChatbotProps {
  onClose: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Array<{ text: string; sender: string }>>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const maxMessages = 10;  // Define the maximum number of messages to display

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    const botResponse = { text: `Quack: ${input}`, sender: "bot" };
    const newMessages = [...messages, userMessage, botResponse];
    if (newMessages.length > maxMessages) {
      // Remove the oldest messages to maintain the maxMessages limit
      newMessages.splice(0, newMessages.length - maxMessages);
    }
    setMessages(newMessages);
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
        <button
          onClick={onClose}
          className="close-btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
        >
          Close
        </button>
      </div>

      <div className="messages-container overflow-y-auto p-4 flex-grow">
        {messages.map((message, index) => (
          <div key={index}
               className={`message ${message.sender === "user" ? "bg-blue-100" : "bg-green-100"} my-2 p-2 rounded`}>
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
        <button
          onClick={handleSubmit}
          className="send-btn bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 py-3 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};
