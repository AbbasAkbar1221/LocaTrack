// import React, { useState } from 'react';
// import SearchBar from './SearchBar';
// import { useAuth } from '../context/AuthContext';

// export default function Header({ onToggleHistory }) {
//   const { logout } = useAuth();
//   const [showMenu, setShowMenu] = useState(false);

//   return (
//     <header className="flex items-center px-4 py-2 bg-white shadow-md z-10">
//       <button onClick={onToggleHistory} className="p-2">
//         {/* History Icon */}
//         <span>☰</span>
//       </button>
//       <div className="flex-1 mx-4">
//         <SearchBar />
//       </div>
//       <div className="relative">
//         <button onClick={() => setShowMenu(!showMenu)} className="p-2 rounded-full bg-gray-200">
//           {/* User Icon */}
//           <span>👤</span>
//         </button>
//         {showMenu && (
//           <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md">
//             <button onClick={logout} className="block px-4 py-2 hover:bg-gray-100 w-full text-left">Logout</button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }





import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { useAuth } from '../context/AuthContext';

export default function Header({ onToggleHistory }) {
  const { logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  return (
    // <header className="relative bg-transparent shadow-none border-b border-gray-200 z-10">
    <header className="relative bg-transparent shadow-none pointer-events-auto z-10">
      <div className="flex items-center w-full justify-between px-3 py-3 sm:px-4 sm:py-4">
        {/* Hamburger Menu */}
        <button 
          onClick={onToggleHistory} 
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors mr-2"
          aria-label="Toggle history"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-2 sm:mx-4">
          <SearchBar />
        </div>

        {/* User Profile */}
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)} 
            className="w-9 h-9 rounded-full bg-[#00235E] flex items-center justify-center text-white font-medium hover:bg-[#1C3D7C] transition-colors"
            aria-label="User menu"
          >
            U
          </button>
          
          {showMenu && (
            <>
              {/* Mobile/Tablet backdrop */}
              <div 
                className="fixed inset-0 z-10 sm:hidden" 
                onClick={() => setShowMenu(false)}
              />
              
              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                <button 
                  onClick={() => {
                    logout();
                    setShowMenu(false);
                  }} 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

