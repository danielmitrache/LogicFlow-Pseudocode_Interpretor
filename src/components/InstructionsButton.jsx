import React from 'react';

const InstructionsButton = ({ openInfo }) => {
  return (
    <button
      onClick={openInfo}
      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-5 rounded-2xl hover:cursor-pointer transition-colors duration-300"
    >
      Instrucțiuni
    </button>
  );
};

export default InstructionsButton;
