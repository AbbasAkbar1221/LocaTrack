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
