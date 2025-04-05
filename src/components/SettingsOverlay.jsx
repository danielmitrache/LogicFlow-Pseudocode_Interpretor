const SettingsOverlay = ({ onClose, updateSettings }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-20 bg-gray-900 backdrop-blur-3xl opacity-90">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-[90%] md:w-1/2 z-30">
        <h2 className="text-2xl font-mono font-extrabold mb-4 underline">
          Setări
        </h2>

        <form className="flex flex-col gap-4">
          <label className="text-lg font-bold inline-block font-mono">Temă editor text:</label>
          <select
            className="p-2 rounded-lg inline-block border border-gray-300 bg-gray-200 font-mono"
            defaultValue={localStorage.getItem("theme") || "dark"}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>

          <label className="inline-block text-lg font-mono font-bold ">Dimensiune font:</label>
          <select
            className="p-2 rounded-lg inline-block border border-gray-300 bg-gray-200 font-mono"
            defaultValue={localStorage.getItem("fontSize") || "16"}
          >
            <option value="12">12px</option>
            <option value="14">14px</option>
            <option value="16">16px</option>
            <option value="18">18px</option>
            <option value="20">20px</option>
          </select>

          <label className="inline-block text-lg font-mono font-bold ">Word wrapping:</label>
          <div className="flex items-center">
            <input type="checkbox" className="rounded-lg mr-2 size-4" defaultChecked={localStorage.getItem('wordWrap') === 'true'}/>
            <span className="font-mono">Da</span>
          </div>

          <label className="inline-block text-lg font-mono font-bold">
            Numar maxim de iteratii per structură repetitivă pana la iesire fortată: (pentru a evita buclele infinite)
          </label>
          <input
            type="number"
            className="p-2 rounded-lg border border-gray-300 bg-gray-200 font-mono"
            defaultValue={localStorage.getItem("maxIterations") || "100000"}
          />

          <label className="inline-block text-lg font-mono font-bold ">Interpretare asistata de AI:</label>
          <div className="flex items-center">
            <input type="checkbox" className="rounded-lg mr-2 size-4" defaultChecked={localStorage.getItem('AIassisted') === 'true'}/>
            <span className="font-mono">Da</span>
          </div>

          <button
            type="submit"
            className="py-2 px-4 font-mono font-black bg-green-500 text-white rounded hover:bg-green-600 transition-all duration-500 hover:cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              updateSettings(
                document.querySelector("select").value,
                document.querySelectorAll("select")[1].value,
                document.querySelectorAll("input[type='checkbox']")[0].checked,
                document.querySelector("input[type='number']").value,
                document.querySelectorAll("input[type='checkbox']")[1].checked
              );
              onClose();
            }}
          >
            Salveaza
          </button>
        </form>
        <button
          className="mt-4 py-2 px-4 font-mono font-black bg-red-500 text-white rounded hover:bg-red-700 transition-all duration-500 hover:cursor-pointer"
          onClick={onClose}
        >
          Închide
        </button>
      </div>
    </div>
  );
};

export default SettingsOverlay;
