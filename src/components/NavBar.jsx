import RunButton from "./RunButton"
import SettingsButton from "./SettingsButton"

const NavBar = ({ runCode, openSettings }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-950 via-cyan-700 to-cyan-950 text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-md shadow-black">
        <h1 className="font-mono font-extrabold text-2xl md:text-4xl mx-2">Rulează pseudocod!</h1>
        <SettingsButton openSettings={openSettings} />
        <RunButton runCode={runCode}/>
    </div>
  )
}

export default NavBar