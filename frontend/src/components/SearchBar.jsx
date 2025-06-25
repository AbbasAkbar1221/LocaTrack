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
import { FiSearch, FiX, FiMapPin } from 'react-icons/fi';

const SearchBar = forwardRef((props, ref) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const fetchSuggestionsNow = async (searchText) => {
    if (!searchText || searchText.length < 2) return [];
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/geocode/autocomplete`,
        { params: { query: searchText } }
      );
      return res.data || [];
    } catch (err) {
      console.error('Search error:', err);
      return [];
    }
  };

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
      setShowSuggestions(results.length > 0);
    }, 300);
  }, []);

  const handleSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setIsLoading(true);
    debouncedFetch.cancel();
    const results = await fetchSuggestionsNow(trimmed);
    setIsLoading(false);
    setSuggestions(results);

    if (results.length > 0) {
      selectSuggestion(results[0]);
    } else {
      setShowSuggestions(false);
      props.onNoResults?.(trimmed);
    }
  };

  useImperativeHandle(ref, () => ({
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
    if (suggestions.length > 0) setShowSuggestions(true);
  };

  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  const selectSuggestion = (s) => {
    const placeName = s.place_name || s.text;
    setQuery(placeName);
    setShowSuggestions(false);
    window.dispatchEvent(
      new CustomEvent('select-location', {
        detail: { address: placeName, center: s.center },
      })
    );
    props.onSelect?.(s);
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

  const clearQuery = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-4 w-4 text-gray-800" strokeWidth={3} />
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

        {/* Clear button */}
        {query && (
          <button
            type="button"
            onClick={clearQuery}
            className="absolute inset-y-0 right-8 pr-2 flex items-center"
            aria-label="Clear search"
          >
            <FiX className="w-4 h-4 text-gray-500 hover:text-gray-700" />
          </button>
        )}

        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#00235E]"></div>
          </div>
        )}
      </div>

      {/* Suggestions */}
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
                      <FiMapPin className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
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
            <div></div>
          )}
        </div>
      )}
    </div>
  );
});

export default SearchBar;
