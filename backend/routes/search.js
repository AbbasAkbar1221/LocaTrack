const express = require('express');
const router = express.Router();
const { addSearch, getHistory, deleteEntry } = require('../controllers/searchController');

router.post('/', addSearch);
router.get('/history', getHistory);
router.delete('/:id', deleteEntry);

module.exports = router;
