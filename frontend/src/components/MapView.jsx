// import React, { useState, useEffect, useRef } from 'react';
// import ReactMapGL, { Marker, Source, Layer } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import axios from 'axios';

// export default function MapView() {
//   const [viewport, setViewport] = useState({
//     latitude: 37.7749,
//     longitude: -122.4194,
//     zoom: 12
//   });
//   const [marker, setMarker] = useState(null);
//   const [route, setRoute] = useState(null);
//   const mapRef = useRef();

//   useEffect(() => {
//     // Try get user location
//     navigator.geolocation.getCurrentPosition(pos => {
//       setViewport(v => ({
//         ...v,
//         latitude: pos.coords.latitude,
//         longitude: pos.coords.longitude
//       }));
//       localStorage.setItem('origin', JSON.stringify([pos.coords.latitude, pos.coords.longitude]));
//     });
//   }, []);

//   useEffect(() => {
//     const handleSelect = (e) => {
//       const { address, center } = e.detail;
//       const [lng, lat] = center;
//       setMarker({ latitude: lat, longitude: lng, address });
//       // Save to history
//       axios.post(`${import.meta.env.VITE_API_URL}/search`, { address, latitude: lat, longitude: lng });
//       // Fetch directions if origin available
//       const origin = JSON.parse(localStorage.getItem('origin') || 'null');
//       if (origin) {
//         axios.get(`${import.meta.env.VITE_API_URL}/directions`, {
//           params: {
//             originLat: origin[0],
//             originLng: origin[1],
//             destLat: lat,
//             destLng: lng
//           }
//         }).then(res => {
//           setRoute(res.data.geometry);
//         }).catch(err => console.error(err));
//       }
//       setViewport(v => ({ ...v, latitude: lat, longitude: lng, zoom: 12 }));
//     };
//     window.addEventListener('select-location', handleSelect);
//     return () => window.removeEventListener('select-location', handleSelect);
//   }, []);

//   return (
//     <ReactMapGL
//       {...viewport}
//       width="100%"
//       height="100%"
//       mapStyle="mapbox://styles/mapbox/streets-v11"
//       mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
//       onMove={evt => setViewport(evt.viewState)}
//       ref={mapRef}
//     >
//       {marker && (
//         <Marker latitude={marker.latitude} longitude={marker.longitude}>
//           <div className="text-red-500">📍</div>
//         </Marker>
//       )}
//       {route && (
//         <Source id="route" type="geojson" data={route}>
//           <Layer
//             id="route-line"
//             type="line"
//             paint={{
//               'line-color': '#3b82f6',
//               'line-width': 4
//             }}
//           />
//         </Source>
//       )}
//     </ReactMapGL>
//   );
// }



// import React, { useState, useEffect, useRef } from 'react';
// import ReactMapGL, { Marker, Source, Layer, NavigationControl, GeolocateControl } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import axios from 'axios';

// export default function MapView() {
//   const [viewport, setViewport] = useState({
//     latitude: 37.7749,
//     longitude: -122.4194,
//     zoom: 12
//   });
//   const [marker, setMarker] = useState(null);
//   const [route, setRoute] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const mapRef = useRef();

//   useEffect(() => {
//     // Try to get user location
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const userPos = {
//           latitude: pos.coords.latitude,
//           longitude: pos.coords.longitude
//         };
//         setUserLocation(userPos);
//         setViewport(v => ({
//           ...v,
//           ...userPos,
//           zoom: 13
//         }));
//         localStorage.setItem('origin', JSON.stringify([pos.coords.latitude, pos.coords.longitude]));
//       },
//       (error) => {
//         console.log('Geolocation error:', error);
//       }
//     );
//   }, []);

//   useEffect(() => {
//     const handleSelect = async (e) => {
//       const { address, center } = e.detail;
//       const [lng, lat] = center;
      
//       setIsLoading(true);
//       setMarker({ latitude: lat, longitude: lng, address });
      
//       try {
//         // Save to history
//         await axios.post(`${import.meta.env.VITE_API_URL}/search`, { 
//           address, 
//           latitude: lat, 
//           longitude: lng 
//         });

//         // Fetch directions if origin available
//         const origin = JSON.parse(localStorage.getItem('origin') || 'null');
//         if (origin) {
//           const res = await axios.get(`${import.meta.env.VITE_API_URL}/directions`, {
//             params: {
//               originLat: origin[0],
//               originLng: origin[1],
//               destLat: lat,
//               destLng: lng
//             }
//           });
//           setRoute(res.data.geometry);
//         }
//       } catch (err) {
//         console.error('Error handling location selection:', err);
//       } finally {
//         setIsLoading(false);
//       }

//       setViewport(v => ({ 
//         ...v, 
//         latitude: lat, 
//         longitude: lng, 
//         zoom: Math.max(v.zoom, 12)
//       }));
//     };

//     window.addEventListener('select-location', handleSelect);
//     return () => window.removeEventListener('select-location', handleSelect);
//   }, []);

//   const routeLayerStyle = {
//     id: 'route-line',
//     type: 'line',
//     paint: {
//       'line-color': '#3b82f6',
//       'line-width': 4,
//       'line-opacity': 0.8
//     }
//   };

//   return (
//     <div className="relative w-full h-full">
//       <ReactMapGL
//         {...viewport}
//         width="100%"
//         height="100%"
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//         mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
//         onMove={evt => setViewport(evt.viewState)}
//         ref={mapRef}
//         attributionControl={false}
//       >
//         {/* User Location Marker */}
//         {userLocation && (
//           <Marker 
//             latitude={userLocation.latitude} 
//             longitude={userLocation.longitude}
//             anchor="bottom"
//           >
//             <div className="relative">
//               <div className="w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-lg"></div>
//               <div className="absolute inset-0 w-4 h-4 bg-blue-500 opacity-25 rounded-full animate-ping"></div>
//             </div>
//           </Marker>
//         )}

//         {/* Destination Marker */}
//         {marker && (
//           <Marker 
//             latitude={marker.latitude} 
//             longitude={marker.longitude}
//             anchor="bottom"
//           >
//             <div className="relative group">
//               <div className="text-2xl">📍</div>
//               {/* Marker Popup */}
//               <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
//                 <p className="text-sm font-medium text-gray-900 max-w-xs truncate">
//                   {marker.address}
//                 </p>
//                 <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
//               </div>
//             </div>
//           </Marker>
//         )}

//         {/* Route Layer */}
//         {route && (
//           <Source id="route" type="geojson" data={route}>
//             <Layer {...routeLayerStyle} />
//           </Source>
//         )}

//         {/* Map Controls */}
//         <div className="absolute top-4 right-4 space-y-2">
//           <NavigationControl showCompass={false} />
//           <GeolocateControl
//             positionOptions={{ enableHighAccuracy: true }}
//             trackUserLocation={true}
//             showUserHeading={true}
//             onGeolocate={(e) => {
//               const pos = {
//                 latitude: e.coords.latitude,
//                 longitude: e.coords.longitude
//               };
//               setUserLocation(pos);
//               localStorage.setItem('origin', JSON.stringify([e.coords.latitude, e.coords.longitude]));
//             }}
//           />
//         </div>

//         {/* Mobile Zoom Controls */}
//         <div className="lg:hidden absolute bottom-20 right-4 flex flex-col space-y-2">
//           <button
//             onClick={() => setViewport(v => ({ ...v, zoom: Math.min(v.zoom + 1, 22) }))}
//             className="w-10 h-10 bg-white rounded-lg shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
//           >
//             <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//             </svg>
//           </button>
//           <button
//             onClick={() => setViewport(v => ({ ...v, zoom: Math.max(v.zoom - 1, 0) }))}
//             className="w-10 h-10 bg-white rounded-lg shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
//           >
//             <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
//             </svg>
//           </button>
//         </div>
//       </ReactMapGL>

//       {/* Loading Overlay */}
//       {isLoading && (
//         <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center z-10">
//           <div className="bg-white rounded-lg p-4 shadow-xl">
//             <div className="flex items-center space-x-3">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
//               <span className="text-sm font-medium text-gray-700">Loading route...</span>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Route Info Panel - Desktop */}
//       {route && marker && (
//         <div className="hidden lg:block absolute top-4 left-4 bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-sm">
//           <div className="flex items-center justify-between mb-3">
//             <h3 className="font-semibold text-gray-900">Route Information</h3>
//             <button
//               onClick={() => {
//                 setRoute(null);
//                 setMarker(null);
//               }}
//               className="p-1 hover:bg-gray-100 rounded"
//             >
//               <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//           <div className="space-y-2 text-sm text-gray-600">
//             <p className="font-medium text-gray-900 truncate">{marker.address}</p>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center">
//                 <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <span>~15 min</span>
//               </div>
//               <div className="flex items-center">
//                 <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//                 </svg>
//                 <span>~5.2 km</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

export default function MapView() {
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 12
  });
  const [marker, setMarker] = useState(null);
  const [route, setRoute] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef();

  useEffect(() => {
    // Try to get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userPos = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          };
          setUserLocation(userPos);
          setViewport(v => ({
            ...v,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            zoom: 13
          }));
          // Store origin for directions
          sessionStorage.setItem('origin', JSON.stringify([pos.coords.latitude, pos.coords.longitude]));
        },
        (error) => {
          console.warn('Geolocation error:', error);
          // Fallback to default location
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    }
  }, []);

  useEffect(() => {
    const handleSelect = async (e) => {
      const { address, center } = e.detail;
      const [lng, lat] = center;
      
      setMarker({ latitude: lat, longitude: lng, address });
      
      try {
        // Save to history
        await axios.post(`${import.meta.env.VITE_API_URL}/search`, { 
          address, 
          latitude: lat, 
          longitude: lng 
        });
        
        // Fetch directions if origin is available
        const origin = JSON.parse(sessionStorage.getItem('origin') || 'null');
        if (origin) {
          setIsLoading(true);
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/directions`, {
              params: {
                originLat: origin[0],
                originLng: origin[1],
                destLat: lat,
                destLng: lng
              }
            });
            setRoute(res.data.geometry);
          } catch (err) {
            console.error('Failed to fetch directions:', err);
          } finally {
            setIsLoading(false);
          }
        }
        
        // Update viewport to show the selected location
        setViewport(v => ({ 
          ...v, 
          latitude: lat, 
          longitude: lng, 
          zoom: Math.max(v.zoom, 12)
        }));
      } catch (err) {
        console.error('Failed to save search:', err);
      }
    };

    window.addEventListener('select-location', handleSelect);
    return () => window.removeEventListener('select-location', handleSelect);
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userPos = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          };
          setUserLocation(userPos);
          setViewport(v => ({
            ...v,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            zoom: 15
          }));
          sessionStorage.setItem('origin', JSON.stringify([pos.coords.latitude, pos.coords.longitude]));
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Unable to get your location. Please enable location services.');
        }
      );
    }
  };

  return (
    <div className="absolute inset-0 z-0">
    
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
        onMove={evt => setViewport(evt.viewState)}
        ref={mapRef}
      >
        {/* User location marker */}
        {userLocation && (
          <Marker 
            latitude={userLocation.latitude} 
            longitude={userLocation.longitude}
            anchor="center"
          >
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg">
              <div className="w-full h-full bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </Marker>
        )}

        {/* Destination marker */}
        {marker && (
          <Marker 
            latitude={marker.latitude} 
            longitude={marker.longitude}
            anchor="bottom"
          >
            <div className="flex flex-col items-center">
              <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium mb-1 shadow-lg max-w-48 truncate">
                {marker.address}
              </div>
              <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </Marker>
        )}

        {/* Route */}
        {route && (
          <Source id="route" type="geojson" data={route}>
            <Layer
              id="route-line"
              type="line"
              paint={{
                'line-color': '#3b82f6',
                'line-width': 4,
                'line-opacity': 0.8
              }}
            />
          </Source>
        )}
      </ReactMapGL>

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        {/* Current location button */}
        <button
          onClick={getCurrentLocation}
          className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Get current location"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* Zoom controls */}
        <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
          <button
            onClick={() => setViewport(v => ({ ...v, zoom: Math.min(v.zoom + 1, 20) }))}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors border-b border-gray-200"
            aria-label="Zoom in"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button
            onClick={() => setViewport(v => ({ ...v, zoom: Math.max(v.zoom - 1, 0) }))}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Zoom out"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          <span className="text-sm text-gray-600">Getting directions...</span>
        </div>
      )}
    </div>
  );
}