// import React, { useState, useEffect, useRef } from 'react';
// import Header from '../components/Header';
// import MapView from '../components/MapView';
// import HistoryDrawer from '../components/HistoryDrawer';
// import axios from 'axios';

// export default function Home() {
//   const [isHistoryOpen, setHistoryOpen] = useState(false);
//   const toggleHistory = () => setHistoryOpen(!isHistoryOpen);

//   return (
//     <div className="h-screen flex">
//       {isHistoryOpen && <HistoryDrawer onClose={toggleHistory} />}
//       <div className="flex-1 flex flex-col">
//         <Header onToggleHistory={toggleHistory} />
//         <MapView />
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import Header from "../components/Header";
import MapView from "../components/MapView";
import HistoryDrawer from "../components/HistoryDrawer";
import { FaHistory } from "react-icons/fa";
import axios from "axios";

// export default function Home() {
//   const [isHistoryOpen, setHistoryOpen] = useState(false);
//   const toggleHistory = () => setHistoryOpen(!isHistoryOpen);

//   return (
//     <div className="h-screen flex bg-gray-50">
//       {/* Left panel - contains logo and history button */}
//       <div className="w-[15%] bg-[#F0F0F0] text-white flex flex-col items-center py-4 space-y-6 mr-[2%]">
//         {/* Logo */}
//         <img src="/Xsymbol.png" alt="Logo" className="w-12 h-12 rounded-full" />

//         {/* History Button */}
//         <button
//           onClick={toggleHistory}
//           className="bg-white text-[#00235E] hover:bg-[#F0F0F0] hover:text-[#1C3D7C] px-5 py-3 rounded-lg w-24 flex flex-col items-center space-y-2"
//         >
//           {/* Time Icon */}
//           <FaHistory className="w-6 h-6" />

//           {/* History Text */}
//           <span className="text-sm font-medium">History</span>
//         </button>
//       </div>

//       {/* Main content area (map and header) */}
//       <div className="flex-1 flex flex-col relative">
//         <Header onToggleHistory={toggleHistory} />
//         <MapView />

//         {/* History Drawer */}
//         <HistoryDrawer
//           isOpen={isHistoryOpen}
//           onClose={() => setHistoryOpen(false)}
//         />

//       </div>

//       {/* Overlay for mobile when the drawer is open */}
//       {isHistoryOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setHistoryOpen(false)}
//         />
//       )}
//     </div>
//   );
// }



export default function Home() {
  const [isHistoryOpen, setHistoryOpen] = useState(false);
  const toggleHistory = () => setHistoryOpen(!isHistoryOpen);

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
  {/* Left panel */}
  <div className="w-1/5 md:w-1/6 lg:w-[15%] mr-6 md:mr-8 lg:mr-10 bg-[#F0F0F0] text-white flex flex-col items-center py-4 space-y-6  z-20">
    <img src="/Xsymbol.png" alt="Logo" className="w-12 h-12 rounded-full" />
    <button
      onClick={toggleHistory}
      className="bg-white text-[#00235E] hover:bg-[#F0F0F0] hover:text-[#1C3D7C] px-5 py-3 rounded-lg w-24 flex flex-col items-center space-y-2"
    >
      <FaHistory className="w-6 h-6" />
      <span className="text-sm font-medium hidden lg:block">History</span>
    </button>
  </div>

  {/* Right/main content area */}
  <div className="relative flex-1 h-full ">
    {/* MapView should be behind everything */}
    <MapView />

    {/* Header floats above map */}
    <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
      <Header onToggleHistory={toggleHistory} />
    </div>

    {/* History Drawer */}
    <HistoryDrawer
      isOpen={isHistoryOpen}
      onClose={() => setHistoryOpen(false)}
    />
  </div>

  {/* Overlay for mobile */}
  {isHistoryOpen && (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      onClick={() => setHistoryOpen(false)}
    />
  )}
</div>

      );
}