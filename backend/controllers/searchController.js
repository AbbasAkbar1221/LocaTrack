const SearchEntry = require("../models/SearchEntry");

exports.addSearch = async (req, res) => {
  const { address, latitude, longitude } = req.body;
  try {
    const entry = new SearchEntry({
      user: req.user._id,
      address,
      latitude,
      longitude,
    });
    await entry.save();
    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const entries = await SearchEntry.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const deleted = await SearchEntry.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!deleted) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json({ message: "Entry removed" });
  } catch (err) {
    console.error("deleteEntry error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// const SearchEntry = require('../models/SearchEntry');
// const { validationResult } = require('express-validator');

// exports.addSearch = async (req, res) => {
//   try {
//     // Check validation results
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         message: 'Validation failed',
//         errors: errors.array()
//       });
//     }

//     const { address, latitude, longitude } = req.body;

//     // Check for duplicate recent searches (within last hour)
//     const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
//     const existingEntry = await SearchEntry.findOne({
//       user: req.user.id,
//       address: address.trim(),
//       createdAt: { $gte: oneHourAgo }
//     });

//     if (existingEntry) {
//       return res.json(existingEntry);
//     }

//     const entry = new SearchEntry({
//       user: req.user.id,
//       address: address.trim(),
//       latitude: parseFloat(latitude),
//       longitude: parseFloat(longitude)
//     });

//     await entry.save();
//     res.status(201).json(entry);
//   } catch (err) {
//     console.error('Add search error:', err);
//     res.status(500).json({ message: 'Server error while saving search' });
//   }
// };

// exports.getHistory = async (req, res) => {
//   try {
//     const { page = 1, limit = 20, search } = req.query;
//     const query = { user: req.user.id };

//     // Add search filter if provided
//     if (search && search.trim()) {
//       query.address = { $regex: search.trim(), $options: 'i' };
//     }

//     const entries = await SearchEntry.find(query)
//       .sort({ createdAt: -1 })
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .exec();

//     const total = await SearchEntry.countDocuments(query);

//     res.json({
//       entries,
//       totalPages: Math.ceil(total / limit),
//       currentPage: page,
//       total
//     });
//   } catch (err) {
//     console.error('Get history error:', err);
//     res.status(500).json({ message: 'Server error while fetching history' });
//   }
// };

// exports.deleteEntry = async (req, res) => {
//   try {
//     const entry = await SearchEntry.findOne({
//       _id: req.params.id,
//       user: req.user.id
//     });

//     if (!entry) {
//       return res.status(404).json({ message: 'Entry not found' });
//     }

//     await SearchEntry.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Entry deleted successfully' });
//   } catch (err) {
//     console.error('Delete entry error:', err);
//     res.status(500).json({ message: 'Server error while deleting entry' });
//   }
// };

// exports.clearHistory = async (req, res) => {
//   try {
//     await SearchEntry.deleteMany({ user: req.user.id });
//     res.json({ message: 'Search history cleared successfully' });
//   } catch (err) {
//     console.error('Clear history error:', err);
//     res.status(500).json({ message: 'Server error while clearing history' });
//   }
// };
