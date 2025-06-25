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
