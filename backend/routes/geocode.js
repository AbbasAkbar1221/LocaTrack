const express = require('express');
const router = express.Router();
const { autocomplete, placeDetails } = require('../controllers/geocodeController');

router.get('/autocomplete', autocomplete);
router.get('/place', placeDetails);

module.exports = router;
