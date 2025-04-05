import React from 'react';

const RunButton = ({ runCode }) => {
  return (
    <button
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-2xl flex items-center"
      onClick={runCode}
    >
      <span className="hidden sm:inline">Rulează</span>
      <span className="ml-1">▶</span>
    </button>
  );
};

export default RunButton;
