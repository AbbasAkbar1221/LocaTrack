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
