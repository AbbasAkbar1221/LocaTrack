import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  HiOutlineClock,
  HiOutlineMapPin,
  HiOutlineTrash,
  HiOutlineXMark,
} from 'react-icons/hi2';

export default function HistoryDrawer({ isOpen, onClose }) {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) fetchHistory();
  }, [isOpen]);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/search/history`);
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

  return (
    <div
      className={`
        h-full bg-white shadow-xl z-20 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-72 sm:w-72 md:w-72 lg:w-80 overflow-x-hidden
      `}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-[#F0F0F0]">
        <div className="flex items-center space-x-2">
          <HiOutlineClock className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Recent</h2>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-gray-200 transition-colors lg:hidden"
          aria-label="Close history"
        >
          <HiOutlineXMark className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#F0F0F0]">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#00235E]" />
          </div>
        ) : entries.length > 0 ? (
          <div className="py-2">
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
                      <HiOutlineMapPin className="w-4 h-4 text-gray-400" />
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

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteEntry(entry._id);
                  }}
                  className="p-2 text-red-500 hover:text-red-600 transition-colors"
                  aria-label="Delete entry"
                >
                  <HiOutlineTrash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <HiOutlineClock className="w-12 h-12 text-gray-300 mb-4" />
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
