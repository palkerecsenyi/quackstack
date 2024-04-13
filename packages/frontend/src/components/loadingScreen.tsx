import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-sky-blue-400">
      <svg
        className="w-full h-full text-steel-blue-500 animate-water"
        viewBox="0 0 100 100"
      >
        <path
          d="M0 100 C 20 80, 40 120, 100 100"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="water-path"
        />
      </svg>
    </div>
  );
};

export default LoadingScreen;
