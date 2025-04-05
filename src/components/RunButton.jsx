import React from 'react';

const RunButton = ({ runCode }) => {
  return (
    <button
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
      onClick={runCode}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 mr-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
          clipRule="evenodd"
        />
      </svg>
      Rulează
    </button>
  );
};

export default RunButton;
