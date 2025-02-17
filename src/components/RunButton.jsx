const RunButton = ({ runCode }) => {
  return (
    <button
      className="inline-block py-2 px-6 font-mono font-bold text-neutral-100 bg-green-600 m-4 rounded-2xl hover:cursor-pointer hover:bg-green-700 transition-all duration-150 w-44"
      onClick={runCode}
    >
      Run ▶ 
    </button>
  );
};

export default RunButton;
