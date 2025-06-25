import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

export default function MapView() {
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 12,
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
            longitude: pos.coords.longitude,
          };
          setUserLocation(userPos);
          setViewport((v) => ({
            ...v,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            zoom: 13,
          }));
          // Store origin for directions
          sessionStorage.setItem(
            "origin",
            JSON.stringify([pos.coords.latitude, pos.coords.longitude])
          );
        },
        (error) => {
          console.warn("Geolocation error:", error);
          // Fallback to default location
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
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
          longitude: lng,
        });

        // Fetch directions if origin is available
        const origin = JSON.parse(sessionStorage.getItem("origin") || "null");
        if (origin) {
          setIsLoading(true);
          try {
            const res = await axios.get(
              `${import.meta.env.VITE_API_URL}/directions`,
              {
                params: {
                  originLat: origin[0],
                  originLng: origin[1],
                  destLat: lat,
                  destLng: lng,
                },
              }
            );
            setRoute(res.data.geometry);
          } catch (err) {
            console.error("Failed to fetch directions:", err);
          } finally {
            setIsLoading(false);
          }
        }

        // Update viewport to show the selected location
        setViewport((v) => ({
          ...v,
          latitude: lat,
          longitude: lng,
          zoom: Math.max(v.zoom, 12),
        }));
      } catch (err) {
        console.error("Failed to save search:", err);
      }
    };

    window.addEventListener("select-location", handleSelect);
    return () => window.removeEventListener("select-location", handleSelect);
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userPos = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          setUserLocation(userPos);
          setViewport((v) => ({
            ...v,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            zoom: 15,
          }));
          sessionStorage.setItem(
            "origin",
            JSON.stringify([pos.coords.latitude, pos.coords.longitude])
          );
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert(
            "Unable to get your location. Please enable location services."
          );
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
        onMove={(evt) => setViewport(evt.viewState)}
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
        {/* {marker && (
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
        )} */}

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
              <img
                src="/gps.png"
                alt="Marker Icon"
                className="w-6 h-6 object-contain"
              />
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
                "line-color": "#3b82f6",
                "line-width": 4,
                "line-opacity": 0.8,
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
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>

        {/* Zoom controls */}
        <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
          <button
            onClick={() =>
              setViewport((v) => ({ ...v, zoom: Math.min(v.zoom + 1, 20) }))
            }
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors border-b border-gray-200"
            aria-label="Zoom in"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              setViewport((v) => ({ ...v, zoom: Math.max(v.zoom - 1, 0) }))
            }
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Zoom out"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#00235E]"></div>
          <span className="text-sm text-gray-600">Getting directions...</span>
        </div>
      )}
    </div>
  );
}
