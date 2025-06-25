// import React, { useState, useMemo, useRef, useEffect } from 'react';
// import axios from 'axios';
// import debounce from 'lodash/debounce';

// export default function SearchBar() {
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const wrapperRef = useRef(null);

//   // Memoize the debounced function so it's stable across renders
//   const debouncedFetch = useMemo(() => {
//     return debounce(async (searchText) => {
//       if (!searchText) {
//         setSuggestions([]);
//         setShowSuggestions(false);
//         return;
//       }
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/geocode/autocomplete`, {
//           params: { query: searchText }
//         });
//         setSuggestions(res.data || []);
//         setShowSuggestions(true);
//       } catch (err) {
//         console.error(err);
//         setSuggestions([]);
//         setShowSuggestions(false);
//       }
//     }, 300);
//   }, []);

//   const handleInputChange = (e) => {
//     const val = e.target.value;
//     setQuery(val);
//     debouncedFetch(val);
//   };

//   // Cleanup on unmount: cancel pending debounced calls
//   useEffect(() => {
//     return () => {
//       debouncedFetch.cancel();
//     };
//   }, [debouncedFetch]);

//   const selectSuggestion = (s) => {
//     setQuery(s.place_name);
//     setShowSuggestions(false);
//     window.dispatchEvent(new CustomEvent('select-location', {
//       detail: { address: s.place_name, center: s.center }
//     }));
//   };

//    useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
//         setShowSuggestions(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={wrapperRef}>
//       <div className="flex">
//         <input
//           type="text"
//           value={query}
//           onChange={handleInputChange}
//           placeholder="Search map"
//           className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:border-blue-500"
//         />
//         <button
//           onClick={() => debouncedFetch.flush()} // immediately invoke pending call
//           className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
//         >
//           Search
//         </button>
//       </div>
//       {showSuggestions && suggestions.length > 0 && (
//         <div className="absolute top-full left-0 right-0 bg-white shadow-lg max-h-60 overflow-y-auto z-20">
//           {suggestions.map(s => (
//             <button
//               key={s.id}
//               onClick={() => selectSuggestion(s)}
//               className="w-full text-left px-4 py-2 hover:bg-gray-100"
//             >
//               {s.place_name}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




// import React, { useState, useMemo, useRef, useEffect } from 'react';
// import axios from 'axios';
// import debounce from 'lodash/debounce';

// export default function SearchBar() {
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const wrapperRef = useRef(null);

//   // Memoize the debounced function so it's stable across renders
//   const debouncedFetch = useMemo(() => {
//     return debounce(async (searchText) => {
//       if (!searchText.trim()) {
//         setSuggestions([]);
//         setShowSuggestions(false);
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/geocode/autocomplete`, {
//           params: { query: searchText }
//         });
//         setSuggestions(res.data || []);
//         setShowSuggestions(true);
//       } catch (err) {
//         console.error(err);
//         setSuggestions([]);
//         setShowSuggestions(false);
//       } finally {
//         setIsLoading(false);
//       }
//     }, 300);
//   }, []);

//   const handleInputChange = (e) => {
//     const val = e.target.value;
//     setQuery(val);
//     if (val.trim()) {
//       setIsLoading(true);
//     }
//     debouncedFetch(val);
//   };

//   const handleSearch = () => {
//     if (query.trim()) {
//       debouncedFetch.flush();
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleSearch();
//     }
//   };

//   // Cleanup on unmount: cancel pending debounced calls
//   useEffect(() => {
//     return () => {
//       debouncedFetch.cancel();
//     };
//   }, [debouncedFetch]);

//   const selectSuggestion = (s) => {
//     setQuery(s.place_name);
//     setShowSuggestions(false);
//     setIsLoading(false);
//     window.dispatchEvent(new CustomEvent('select-location', {
//       detail: { address: s.place_name, center: s.center }
//     }));
//   };

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
//         setShowSuggestions(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="relative w-full" ref={wrapperRef}>
//       <div className="relative flex items-center">
//         {/* Search Icon */}
//         <div className="absolute left-3 z-10">
//           <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </div>

//         {/* Input Field */}
//         <input
//           type="text"
//           value={query}
//           onChange={handleInputChange}
//           onKeyPress={handleKeyPress}
//           placeholder="Search for places, addresses..."
//           className="w-full pl-10 pr-12 py-2.5 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm lg:text-base"
//         />

//         {/* Loading Spinner */}
//         {isLoading && (
//           <div className="absolute right-12 lg:right-14">
//             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
//           </div>
//         )}

//         {/* Search Button - Desktop */}
//         <button
//           onClick={handleSearch}
//           className="hidden lg:block absolute right-2 p-2 text-blue-600 hover:text-blue-700 transition-colors"
//           aria-label="Search"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
//           </svg>
//         </button>

//         {/* Clear Button - Mobile/Tablet */}
//         {query && (
//           <button
//             onClick={() => {
//               setQuery('');
//               setSuggestions([]);
//               setShowSuggestions(false);
//               setIsLoading(false);
//             }}
//             className="lg:hidden absolute right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
//             aria-label="Clear search"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         )}
//       </div>

//       {/* Suggestions Dropdown */}
//       {showSuggestions && suggestions.length > 0 && (
//         <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 max-h-64 overflow-y-auto z-30">
//           {suggestions.map((s, index) => (
//             <button
//               key={s.id || index}
//               onClick={() => selectSuggestion(s)}
//               className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 focus:bg-gray-50 focus:outline-none"
//             >
//               <div className="flex items-center">
//                 <svg className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium text-gray-900 truncate">{s.place_name || s.text}</p>
//                   {s.place_type && (
//                     <p className="text-xs text-gray-500 capitalize">{s.place_type.join(', ')}</p>
//                   )}
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       )}

//       {/* No Results */}
//       {showSuggestions && suggestions.length === 0 && !isLoading && query.trim() && (
//         <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-30">
//           <div className="text-center text-gray-500">
//             <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//             <p className="text-sm">No places found</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useState, useMemo, useRef, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // Memoize the debounced function so it's stable across renders
  const debouncedFetch = useMemo(() => {
    return debounce(async (searchText) => {
      if (!searchText || searchText.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/geocode/autocomplete`, {
          params: { query: searchText }
        });
        setSuggestions(res.data || []);
        setShowSuggestions(true);
      } catch (err) {
        console.error('Search error:', err);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    debouncedFetch(val);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  // Cleanup on unmount: cancel pending debounced calls
  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  const selectSuggestion = (s) => {
    setQuery(s.place_name);
    setShowSuggestions(false);
    window.dispatchEvent(new CustomEvent('select-location', {
      detail: { address: s.place_name, center: s.center }
    }));
  };

  const handleSearch = () => {
    if (query.trim()) {
      debouncedFetch.flush(); // immediately invoke pending call
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyPress={handleKeyPress}
          placeholder="Search for places..."
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
        />
        
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-30">
          {suggestions.length > 0 ? (
            <>
              {/* Recent searches header (if you want to show recent searches) */}
              <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
                Search results
              </div>
              
              {suggestions.map((s, index) => (
                <button
                  key={s.id || index}
                  onClick={() => selectSuggestion(s)}
                  className="w-full text-left px-3 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0 transition-colors group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {s.place_name || s.text}
                      </p>
                      {s.context && (
                        <p className="text-xs text-gray-500 mt-0.5 truncate">
                          {s.context.map(c => c.text).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </>
          ) : query.length >= 2 && !isLoading ? (
            <div className="px-3 py-4 text-sm text-gray-500 text-center">
              No places found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}