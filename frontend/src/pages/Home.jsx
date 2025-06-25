import React, { useState } from "react";
import { FaHistory, FaBookmark } from "react-icons/fa";
import Header from "../components/Header";
import MapView from "../components/MapView";
import HistoryDrawer from "../components/HistoryDrawer";

export default function Home() {
  const [isHistoryOpen, setHistoryOpen] = useState(false);
  const toggleHistory = () => setHistoryOpen((prev) => !prev);

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Left panel: logo + history button */}
      <div className="w-1/5 md:w-1/6 lg:w-[15%] mr-6 md:mr-8 lg:mr-10 bg-[#F0F0F0] text-white flex flex-col items-center py-4 space-y-6 z-20">
        <img src="/Xsymbol.png" alt="Logo" className="w-12 h-12 rounded-full" />
        {/* <button
          onClick={toggleHistory}
          className="bg-white text-[#00235E] hover:bg-[#e0e0e0] hover:text-[#1C3D7C] px-4 py-2 rounded-lg flex flex-col items-center space-y-1"
        >
          <FaHistory className="w-6 h-6" />
          <span className="text-sm font-medium hidden lg:block">History</span>
        </button> */}

        <button
  onClick={toggleHistory}
  className={`
    px-4 py-2 rounded-lg flex flex-col items-center space-y-1 transition-colors
    ${isHistoryOpen ? 'bg-[#00235E] text-white' : 'bg-white text-[#00235E] hover:bg-[#e0e0e0] hover:text-[#1C3D7C]'}
  `}
>
  {isHistoryOpen ? (
    <FaBookmark className="w-6 h-6 text-white" />
  ) : (
    <FaHistory className="w-6 h-6 text-[#00235E]" />
  )}
  <span className="text-sm font-medium hidden lg:block">
    History
  </span>
</button>


      </div>

      {/* History Drawer / Sidebar */}
      {/* <HistoryDrawer isOpen={isHistoryOpen} onClose={() => setHistoryOpen(false)} /> */}

      {/* HistoryDrawer overlays over map (not in flex layout) */}
     {isHistoryOpen && (
  <div
    className="absolute top-16 left-[15%] lg:left-[15%] ml-6 md:ml-8 lg:ml-10 z-20 w-fit h-[calc(100%-4rem)] overflow-y-auto"
  >
    <HistoryDrawer isOpen={true} onClose={() => setHistoryOpen(false)} />
  </div>
)}



      {/* Main content area */}
      <div className="relative flex-1 h-full overflow-hidden">
        {/* MapView behind everything */}
        <div className="absolute inset-0 ">
          <MapView />
        </div>

        {/* Header floats above map */}
        <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
          <Header />
        </div>
      </div>

      {/* Overlay for mobile when drawer is open */}
      {isHistoryOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setHistoryOpen(false)}
        />
      )}
    </div>
  );
}
