import React, { useState } from "react";
import { FaHistory, FaBookmark } from "react-icons/fa";
import Header from "../components/Header";
import MapView from "../components/MapView";
import HistoryDrawer from "../components/HistoryDrawer";

export default function Home() {
  const [isHistoryOpen, setHistoryOpen] = useState(false);
  const toggleHistory = () => setHistoryOpen((prev) => !prev);

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden relative sm:gap-x-6">      
      <div className="w-1/5 md:w-1/6 lg:w-[15%] bg-[#F0F0F0] flex flex-col items-center py-4 space-y-6 z-30">
        <img src="/Xsymbol.png" alt="Logo" className="w-12 h-12 rounded-full" />
        <button
          onClick={toggleHistory}
          className={`px-4 py-2 rounded-lg flex flex-col items-center space-y-1 transition-colors ${
            isHistoryOpen
              ? "bg-[#00235E] text-white"
              : "bg-white text-[#00235E] hover:bg-[#e0e0e0] hover:text-[#1C3D7C]"
          }`}
        >
          {isHistoryOpen ? (
            <FaBookmark className="w-6 h-6" />
          ) : (
            <FaHistory className="w-6 h-6" />
          )}
          <span className="text-sm font-medium hidden lg:block">History</span>
        </button>
      </div>

      {isHistoryOpen && (
        <div className="w-80 h-full overflow-y-auto bg-white shadow-xl z-20">
          <HistoryDrawer isOpen={true} onClose={() => setHistoryOpen(false)} />
        </div>
      )}

      <div className="relative flex-1 h-full overflow-hidden">
        <div className="absolute inset-0">
          <MapView />
        </div>
        <div className="absolute top-0 left-0 right-0 z-20">
          <Header />
        </div>
      </div>

      {/* Dark overlay for mobile */}
      {isHistoryOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setHistoryOpen(false)}
        />
      )}
    </div>
  );
}
