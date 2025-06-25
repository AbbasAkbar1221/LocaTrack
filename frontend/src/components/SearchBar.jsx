import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

const SearchBar = forwardRef((props, ref) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // 1. Define immediate fetch function
  const fetchSuggestionsNow = async (searchText) => {
    if (!searchText || searchText.length < 2) {
      return [];
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/geocode/autocomplete`,
        {
          params: { query: searchText },
        }
      );
      return res.data || [];
    } catch (err) {
      console.error('Search error:', err);
      return [];
    }
  };

  // 2. Memoize a debounced wrapper around fetchSuggestionsNow
  const debouncedFetch = useMemo(() => {
    return debounce(async (searchText) => {
      if (!searchText || searchText.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const results = await fetchSuggestionsNow(searchText);
      setIsLoading(false);
      setSuggestions(results);
      if (results.length > 0) {
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }, 300);
  }, []);

  // 3. The immediate “search” action: fetch now, then act on results
  const handleSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) {
      // Optionally: clear suggestions and show a "type more" message
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setIsLoading(true);
    // Cancel any pending debounced calls to avoid conflicts
    debouncedFetch.cancel();

    const results = await fetchSuggestionsNow(trimmed);
    setIsLoading(false);
    setSuggestions(results);

    if (results.length > 0) {
      // Automatically select the first suggestion
      selectSuggestion(results[0]);
    } else {
      // No results: you can show a “no results” message in the dropdown,
      // or dispatch an event so parent knows there were no matches.
      setShowSuggestions(false);
      if (props.onNoResults) {
        props.onNoResults(trimmed);
      }
      // Optionally, show a temporary UI: e.g. setShowSuggestions(true) and render a “No places found” in dropdown
      // For simplicity, we hide suggestions here.
    }
  };

  useImperativeHandle(ref, () => ({
    // parent can call searchBarRef.current.search()
    search: handleSearch,
    getQuery: () => query,
    setQueryExtern: (newQ) => {
      setQuery(newQ);
      debouncedFetch(newQ);
    },
  }));

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
    const placeName = s.place_name || s.text;
    setQuery(placeName);
    setShowSuggestions(false);
    // Dispatch a custom event for selection
    window.dispatchEvent(
      new CustomEvent('select-location', {
        detail: { address: placeName, center: s.center },
      })
    );
    // Also allow parent callback if provided
    if (props.onSelect) {
      props.onSelect(s);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearQuery = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {/* Input wrapper */}
      <div className="relative">
        {/* Magnifying glass icon at extreme left */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyPress={handleKeyPress}
          placeholder={props.placeholder || 'Search Map'}
          className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-full bg-gray-50 focus:bg-white focus:border-[#00235E] focus:outline-none focus:ring-1 focus:ring-[#00235E] transition-all"
        />

        {/* Clear icon when there is content */}
        {query && (
          <button
            type="button"
            onClick={clearQuery}
            className="absolute inset-y-0 right-8 pr-2 flex items-center"
            aria-label="Clear search"
          >
            <svg
              className="w-4 h-4 text-gray-500 hover:text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#00235E]"></div>
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-30">
          {suggestions.length > 0 ? (
            <>
              <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
                Search results
              </div>
              {suggestions.map((s, idx) => (
                <button
                  key={s.id || idx}
                  onClick={() => selectSuggestion(s)}
                  className="w-full text-left px-3 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0 transition-colors group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {s.place_name || s.text}
                      </p>
                      {s.context && (
                        <p className="text-xs text-gray-500 mt-0.5 truncate">
                          {s.context.map((c) => c.text).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </>
          ) : (
            // Optionally show a “No results” message here if you prefer:
            // <div className="px-3 py-4 text-sm text-gray-500 text-center">
            //   No places found for "{query}"
            // </div>
            <div></div>
          )}
        </div>
      )}
    </div>
  );
});

export default SearchBar;
