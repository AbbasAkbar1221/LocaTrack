import React, { useRef, useState } from 'react';
import SearchBar from './SearchBar';
import { useAuth } from '../context/AuthContext';

export default function Header({ }) {
  const { logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  // ref to call search on SearchBar
  const searchBarRef = useRef(null);

  const handleSearchClick = () => {
    if (searchBarRef.current && typeof searchBarRef.current.search === 'function') {
      searchBarRef.current.search();
    }
  };

  return (
    <header className="relative bg-transparent shadow-none pointer-events-auto z-10">
      <div className="flex items-center w-full justify-between px-3 py-3 sm:px-4 sm:py-4">
        {/* Left: SearchBar + Search Button */}
        <div className="flex items-center w-full max-w-2xl">
          {/* <SearchBar ref={searchBarRef} placeholder="Search for places..." /> */}
          <div className="w-full sm:max-w-xs md:max-w-sm lg:max-w-md">
            <SearchBar ref={searchBarRef} placeholder="Search Map" />
          </div>
          <button
            type="button"
            onClick={handleSearchClick}
            className="ml-2 py-2 px-4 sm:px-6 lg:px-8 bg-[#00235E] hover:bg-[#1C3D7C] text-white rounded-lg transition-colors flex items-center justify-center"
            aria-label="Search"
          >
            Search
          </button>
        </div>

        {/* Right: User Profile */}
        <div className="relative ml-4">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-9 h-9 rounded-full bg-[#00235E] flex items-center justify-center text-white font-medium hover:bg-[#1C3D7C] transition-colors"
            aria-label="User menu"
          >
            U
          </button>

          {showMenu && (
            <>
              {/* Backdrop on small devices */}
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


