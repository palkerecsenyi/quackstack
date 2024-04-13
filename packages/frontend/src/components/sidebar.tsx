import React from "react";

// Define the type for the onClick prop
type onClickPropType = (fileName: string) => void;

interface SidebarProps {
  onClick: onClickPropType;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClick }) => {
  return (
    <div className="bg-lightGray border border-gray-600 h-screen w-1/5">
      <ul className="py-4">
        <li>
          <button
            className="px-4 py-2 text-white hover:bg-gray-300 hover:text-black"
            onClick={() => onClick("index.html")}
          >
            index.html
          </button>
        </li>
        <li>
          <button
            className="px-4 py-2 text-white hover:bg-gray-300 hover:text-black"
            onClick={() => onClick("script.py")}
          >
            script.py
          </button>
        </li>
      </ul>
    </div>
  );
};
