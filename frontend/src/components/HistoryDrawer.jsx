// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function HistoryDrawer({ onClose }) {
//   const [entries, setEntries] = useState([]);

//   useEffect(() => {
//     axios.get(`${import.meta.env.VITE_API_URL}/search/history`)
//       .then(res => setEntries(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   const selectEntry = (entry) => {
//     window.dispatchEvent(new CustomEvent('select-location', {
//       detail: { address: entry.address, center: [entry.longitude, entry.latitude] }
//     }));
//     onClose();
//   };

//   const deleteEntry = (id) => {
//     axios.delete(`${import.meta.env.VITE_API_URL}/search/${id}`)
//       .then(() => setEntries(entries.filter(e => e._id !== id)))
//       .catch(err => console.error(err));
//   };

//   return (
//     <div className="absolute inset-0 flex z-30">
//       <div className="w-4/5 max-w-xs bg-white shadow-lg flex flex-col">
//         <div className="flex items-center justify-between px-4 py-2 border-b">
//           <h2 className="text-lg font-semibold">History</h2>
//           <button onClick={onClose}>✕</button>
//         </div>
//         <div className="flex-1 overflow-y-auto">
//           {entries.map(entry => (
//             <div key={entry._id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-100">
//               <button onClick={() => selectEntry(entry)} className="text-left flex-1">
//                 <p className="font-medium">{entry.address}</p>
//                 <p className="text-xs text-gray-500">{new Date(entry.createdAt).toLocaleString()}</p>
//               </button>
//               <button onClick={() => deleteEntry(entry._id)} className="p-2">
//                 🗑️
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex-1" onClick={onClose} />
//     </div>
//   );
// }




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function HistoryDrawer({ onClose, isOpen }) {
//   const [entries, setEntries] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (isOpen) {
//       fetchHistory();
//     }
//   }, [isOpen]);

//   const fetchHistory = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_URL}/search/history`);
//       setEntries(res.data || []);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load history');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const selectEntry = (entry) => {
//     window.dispatchEvent(new CustomEvent('select-location', {
//       detail: { 
//         address: entry.address, 
//         center: [entry.longitude, entry.latitude] 
//       }
//     }));
//     onClose();
//   };

//   const deleteEntry = async (id) => {
//     try {
//       await axios.delete(`${import.meta.env.VITE_API_URL}/search/${id}`);
//       setEntries(entries.filter(e => e._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffTime = Math.abs(now - date);
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
//     if (diffDays === 0) {
//       return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     } else if (diffDays === 1) {
//       return 'Yesterday';
//     } else if (diffDays < 7) {
//       return `${diffDays} days ago`;
//     } else {
//       return date.toLocaleDateString();
//     }
//   };

//   return (
//     <>
//       {/* Backdrop */}
//       <div 
//         className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40 lg:hidden ${
//           isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
//         }`}
//         onClick={onClose}
//       />

//       {/* Drawer Panel */}
//       <div className={`
//         fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
//         lg:relative lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-200
//         ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//       `}>
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
//           <div className="flex items-center">
//             <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <h2 className="text-lg font-semibold text-gray-900">Recent Searches</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="lg:hidden p-1 hover:bg-gray-200 rounded-md transition-colors"
//             aria-label="Close history"
//           >
//             <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto">
//           {isLoading ? (
//             <div className="flex items-center justify-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//             </div>
//           ) : error ? (
//             <div className="p-6 text-center">
//               <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.865-.833-2.635 0L4.178 16.5c-.77.833.192 2.5 1.732 2.5z" />
//               </svg>
//               <p className="text-gray-500 text-sm">{error}</p>
//               <button
//                 onClick={fetchHistory}
//                 className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
//               >
//                 Try Again
//               </button>
//             </div>
//           ) : entries.length === 0 ? (
//             <div className="p-6 text-center">
//               <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <p className="text-gray-500 text-sm">No search history yet</p>
//               <p className="text-gray-400 text-xs mt-1">Your recent searches will appear here</p>
//             </div>
//           ) : (
//             <div className="py-2">
//               {entries.map((entry, index) => (
//                 <div
//                   key={entry._id || index}
//                   className="group flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
//                 >
//                   <button
//                     onClick={() => selectEntry(entry)}
//                     className="flex-1 flex items-center text-left min-w-0"
//                   >
//                     <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
//                       <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                       </svg>
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="font-medium text-gray-900 truncate text-sm">
//                         {entry.address}
//                       </p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         {formatDate(entry.createdAt)}
//                       </p>
//                     </div>
//                   </button>
                  
//                   <button
//                     onClick={() => deleteEntry(entry._id)}
//                     className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-200 rounded-full transition-all ml-2"
//                     aria-label="Delete entry"
//                   >
//                     <svg className="w-4 h-4 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer - Desktop Only */}
//         <div className="hidden lg:block border-t border-gray-200 p-4">
//           <button
//             onClick={() => setEntries([])}
//             disabled={entries.length === 0}
//             className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
//           >
//             Clear All History
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }




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
    window.dispatchEvent(new CustomEvent('select-location', {
      detail: { address: entry.address, center: [entry.longitude, entry.latitude] }
    }));
    onClose();
  };

  const deleteEntry = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/search/${id}`);
      setEntries(entries.filter(e => e._id !== id));
    } catch (err) {
      console.error('Failed to delete entry:', err);
    }
  };

  const clearAllHistory = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/search/history`);
      setEntries([]);
    } catch (err) {
      console.error('Failed to clear history:', err);
    }
  };

  return (
    <div 
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-80 bg-white shadow-xl transition-transform duration-300 ease-in-out z-50 lg:relative lg:translate-x-0 ${
        isOpen ? 'lg:block' : 'lg:hidden'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-lg font-semibold text-gray-900">Recent</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          {entries.length > 0 && (
            <button
              onClick={clearAllHistory}
              className="text-xs text-gray-500 hover:text-red-600 transition-colors"
            >
              Clear all
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-200 transition-colors lg:hidden"
            aria-label="Close history"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        ) : entries.length > 0 ? (
          <div className="py-2">
            {entries.map((entry, index) => (
              <div 
                key={entry._id || index} 
                className="group hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center px-4 py-3">
                  <button 
                    onClick={() => selectEntry(entry)}
                    className="flex-1 text-left min-w-0"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => deleteEntry(entry._id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all"
                    aria-label="Delete entry"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                {index < entries.length - 1 && (
                  <div className="ml-11 border-b border-gray-100"></div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-gray-500 text-center">
              No recent searches
            </p>
            <p className="text-xs text-gray-400 text-center mt-1">
              Your search history will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}