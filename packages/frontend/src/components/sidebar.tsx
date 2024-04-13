import React, { useState } from "react";
import { Chatbot } from './Chatbot'; // Ensure to import Chatbot component

type onClickPropType = (fileName: string) => void;

interface SidebarProps {
  onClick: onClickPropType;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClick }) => {
  const [chatVisible, setChatVisible] = useState(false);

  return (
    <div className="bg-gray-800 h-screen w-1/5 p-4 flex flex-col">

      <button
        className="px-4 py-2 text-white hover:bg-gray-600"
        onClick={() => onClick("index.html")}
      >
        index.html
      </button>
      <button
        className="px-4 py-2 text-white hover:bg-gray-600 mt-2"
        onClick={() => onClick("script.py")}
      >
        script.py
      </button>
      {/* Chatbot toggle button */}
      <button
        className="px-4 py-2 text-white hover:bg-gray-600 mt-2"
        onClick={() => setChatVisible(!chatVisible)}
      >
        Chat with Bot
      </button>
      {/* Chatbot component */}
      {chatVisible && <Chatbot onClose={() => setChatVisible(false)} />}
    </div>
  );
};
