const axios = require('axios');

exports.getDirections = async (req, res) => {
  const { originLat, originLng, destLat, destLng } = req.query;
  try {
    const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${originLng},${originLat};${destLng},${destLat}`, {
      params: {
        access_token: process.env.MAPBOX_API_KEY,
        geometries: 'geojson'
      }
    });
    const route = response.data.routes[0];
    res.json({
      geometry: route.geometry,
      distance: route.distance,
      duration: route.duration
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: 'Error fetching directions' });
  }
};




// const axios = require('axios');

// exports.getDirections = async (req, res) => {
//   try {
//     const { originLat, originLng, destLat, destLng } = req.query;
    
//     // Validate coordinates
//     if (!originLat || !originLng || !destLat || !destLng) {
//       return res.status(400).json({ message: 'All coordinates are required' });
//     }

//     const coords = [originLat, originLng, destLat, destLng].map(parseFloat);
//     if (coords.some(isNaN)) {
//       return res.status(400).json({ message: 'Invalid coordinates provided' });
//     }

//     if (!process.env.MAPBOX_API_KEY) {
//       return res.status(500).json({ message: 'Mapbox API key not configured' });
//     }

//     const response = await axios.get(
//       `https://api.mapbox.com/directions/v5/mapbox/driving/${originLng},${originLat};${destLng},${destLat}`,
//       {
//         params: {
//           access_token: process.env.MAPBOX_API_KEY,
//           geometries: 'geojson',
//           overview: 'full',
//           steps: true
//         },
//         timeout: 10000
//       }
//     );

//     if (!response.data.routes || response.data.routes.length === 0) {
//       return res.status(404).json({ message: 'No route found' });
//     }

//     const route = response.data.routes[0];
//     res.json({
//       geometry: route.geometry,
//       distance: route.distance,
//       duration: route.duration,
//       legs: route.legs
//     });
//   } catch (err) {
//     console.error('Directions error:', err.response?.data || err.message);
    
//     if (err.code === 'ECONNABORTED') {
//       return res.status(408).json({ message: 'Request timeout - please try again' });
//     }
    
//     res.status(500).json({ message: 'Error fetching directions' });
//   }
// };
