import { useState, useEffect } from "react";
const InstructionsButton = ({ openInfo }) => {
  const [buttonText, setButtonText] = useState(
    window.innerWidth < 768 ? "ℹ" : "Despre ℹ"
  );

  useEffect(() => {
    const handleResize = () => {
      setButtonText(window.innerWidth < 768 ? "ℹ" : "Despre ℹ");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <button
      className="inline-block md:ml-auto bg-slate-800 hover:bg-slate-900 py-2 px-6 font-mono font-bold text-neutral-100 m-4 rounded-2xl hover:cursor-pointer transition-all duration-150 w-44"
      onClick={openInfo}
    >
      {buttonText}
    </button>
  );
};

export default InstructionsButton;
