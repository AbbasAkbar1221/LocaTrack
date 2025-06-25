import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function HistoryDrawer({ isOpen, onClose }) {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen]);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/search/history`
      );
      setEntries(res.data || []);
    } catch (err) {
      console.error('Failed to fetch history:', err);
      setEntries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const selectEntry = (entry) => {
    window.dispatchEvent(
      new CustomEvent('select-location', {
        detail: { address: entry.address, center: [entry.longitude, entry.latitude] },
      })
    );
    onClose();
  };

  const deleteEntry = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/search/${id}`);
      setEntries((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error('Failed to delete entry:', err);
    }
  };

  // Base styling for drawer
  const baseClasses = `
    bg-white shadow-xl
    transition-transform duration-300 ease-in-out
    flex flex-col h-full lg:h-full
  `;
  // Mobile positioning: fixed and slide in/out
  const mobilePosition = `
    fixed inset-y-0 left-0 w-80
    transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    z-50
  `;
  // Desktop: hidden or shown in flex layout
  const desktopPosition = `
    hidden lg:block lg:relative lg:translate-x-0
  `;
  // On desktop, show only if isOpen; hide if not
  const desktopDisplay = isOpen ? 'lg:block' : 'lg:hidden';

  return (
    <div
      className={`
        ${baseClasses}
        ${mobilePosition}
        ${desktopPosition}
        ${desktopDisplay}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-[#F0F0F0]">
        <div className="flex items-center space-x-2">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-lg font-semibold text-gray-900">Recent</h2>
        </div>

        {/* Close button on mobile only */}
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-gray-200 transition-colors lg:hidden"
          aria-label="Close history"
        >
          <svg
            className="w-5 h-5 text-gray-600"
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
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#00235E]"></div>
          </div>
        ) : entries.length > 0 ? (
          <div className="py-2 bg-[#F0F0F0] ">
            {entries.map((entry, index) => (
              <div
                key={entry._id || index}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <button
                  onClick={() => selectEntry(entry)}
                  className="flex-1 text-left min-w-0"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-gray-400"
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
                        {entry.address}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {new Date(entry.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                </button>

                {/* Always-visible red trash icon */}
                <button
                  onClick={() => deleteEntry(entry._id)}
                  className="p-2 text-red-500 hover:text-red-600 transition-colors"
                  aria-label="Delete entry"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <svg
              className="w-12 h-12 text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-gray-500 text-center">No recent searches</p>
            <p className="text-xs text-gray-400 text-center mt-1">
              Your search history will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}