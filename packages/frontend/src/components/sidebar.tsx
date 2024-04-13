import React from "react";

interface File {
  name: string;
  language: string;
  value: string;
}

interface FileDictionary {
  [key: string]: File;
}

// Define the type for the onClick prop
type onClickPropType = (fileName: string) => void;

interface SidebarProps {
  onClick: onClickPropType;
  files: FileDictionary;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClick, files }) => {
  return (
    <div className="bg-lightGray border border-gray-600 h-screen w-1/5">
      <ul className="py-4">
        {Object.keys(files).map((fileName) => (
          <li>
            <button
              className="px-4 py-2 text-white hover:bg-gray-300 hover:text-black"
              onClick={() => onClick(fileName)}
            >
              {fileName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
