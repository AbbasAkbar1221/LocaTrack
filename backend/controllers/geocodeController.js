const axios = require('axios');

exports.autocomplete = async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`, {
      params: {
        access_token: process.env.MAPBOX_API_KEY,
        autocomplete: true,
        limit: 5
      }
    });
    const suggestions = response.data.features.map(f => ({
      id: f.id,
      place_name: f.place_name,
      center: f.center
    }));
    res.json(suggestions);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: 'Error fetching autocomplete' });
  }
};



exports.placeDetails = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }
  try {
    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(id)}.json`, {
      params: {
        access_token: process.env.MAPBOX_API_KEY
      }
    });
    // Mapbox doesn't provide direct lookup by id via this endpoint; use feature from autocomplete directly
    res.json(response.data.features[0]);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: 'Error fetching place details' });
  }
};



// const axios = require('axios');
// const rateLimit = require('express-rate-limit');

// // Rate limiting for geocoding requests
// const geocodeLimit = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each user to 100 requests per windowMs
//   message: 'Too many geocoding requests, please try again later'
// });

// exports.autocomplete = async (req, res) => {
//   try {
//     const { query } = req.query;
    
//     if (!query || query.trim().length < 2) {
//       return res.status(400).json({ message: 'Query must be at least 2 characters long' });
//     }

//     if (!process.env.MAPBOX_API_KEY) {
//       return res.status(500).json({ message: 'Mapbox API key not configured' });
//     }

//     const response = await axios.get(
//       `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query.trim())}.json`,
//       {
//         params: {
//           access_token: process.env.MAPBOX_API_KEY,
//           autocomplete: true,
//           limit: 5,
//           types: 'address,poi,place'
//         },
//         timeout: 5000 // 5 second timeout
//       }
//     );

//     const suggestions = response.data.features.map(feature => ({
//       id: feature.id,
//       place_name: feature.place_name,
//       center: feature.center,
//       context: feature.context,
//       place_type: feature.place_type
//     }));

//     res.json({ suggestions });
//   } catch (err) {
//     console.error('Autocomplete error:', err.response?.data || err.message);
    
//     if (err.code === 'ECONNABORTED') {
//       return res.status(408).json({ message: 'Request timeout - please try again' });
//     }
    
//     if (err.response?.status === 401) {
//       return res.status(500).json({ message: 'Invalid Mapbox API key' });
//     }
    
//     res.status(500).json({ message: 'Error fetching address suggestions' });
//   }
// };

// exports.geocodeAddress = async (req, res) => {
//   try {
//     const { address } = req.query;
    
//     if (!address || address.trim().length === 0) {
//       return res.status(400).json({ message: 'Address is required' });
//     }

//     if (!process.env.MAPBOX_API_KEY) {
//       return res.status(500).json({ message: 'Mapbox API key not configured' });
//     }

//     const response = await axios.get(
//       `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address.trim())}.json`,
//       {
//         params: {
//           access_token: process.env.MAPBOX_API_KEY,
//           limit: 1
//         },
//         timeout: 5000
//       }
//     );

//     if (response.data.features.length === 0) {
//       return res.status(404).json({ message: 'Address not found' });
//     }

//     const feature = response.data.features[0];
//     res.json({
//       address: feature.place_name,
//       coordinates: feature.center,
//       bbox: feature.bbox,
//       context: feature.context
//     });
//   } catch (err) {
//     console.error('Geocoding error:', err.response?.data || err.message);
    
//     if (err.code === 'ECONNABORTED') {
//       return res.status(408).json({ message: 'Request timeout - please try again' });
//     }
    
//     res.status(500).json({ message: 'Error geocoding address' });
//   }
// };