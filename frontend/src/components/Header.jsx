import React, { useRef, useState } from 'react';
import SearchBar from './SearchBar';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const searchBarRef = useRef(null);

  const handleSearchClick = () => {
    if (searchBarRef.current?.search) {
      searchBarRef.current.search();
    }
  };

  return (
    <header className="relative bg-transparent shadow-none pointer-events-auto z-10">
      <div className="w-full px-3 py-3 sm:px-4 sm:py-4">
        {/* Top row: searchbar + U button */}
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center w-full max-w-2xl space-x-2">
            <div className="w-full sm:max-w-xs md:max-w-sm lg:max-w-md">
              <SearchBar ref={searchBarRef} placeholder="Search Map" />
            </div>

            {/* Desktop only: Search button */}
            <button
              type="button"
              onClick={handleSearchClick}
              className="hidden sm:flex py-2 px-4 sm:px-6 lg:px-8 bg-[#00235E] hover:bg-[#1C3D7C] text-white rounded-lg transition-colors items-center justify-center"
              aria-label="Search"
            >
              Search
            </button>
          </div>

          {/* U button (visible on all devices) */}
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
                {/* Mobile backdrop */}
                <div
                  className="fixed inset-0 z-10 sm:hidden"
                  onClick={() => setShowMenu(false)}
                />
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

        {/* Mobile only: Search button below bar */}
        <div className="mt-2 flex justify-end sm:hidden">
          <button
            type="button"
            onClick={handleSearchClick}
            className="py-2 px-4 bg-[#00235E] hover:bg-[#1C3D7C] text-white rounded-lg transition-colors"
            aria-label="Search"
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
}
