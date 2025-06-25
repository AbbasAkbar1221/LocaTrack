const mongoose = require('mongoose');

const SearchEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SearchEntry', SearchEntrySchema);




// const mongoose = require('mongoose');

// const SearchEntrySchema = new mongoose.Schema({
//   user: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User', 
//     required: true,
//     index: true
//   },
//   address: { 
//     type: String, 
//     required: [true, 'Address is required'],
//     trim: true,
//     maxlength: [500, 'Address cannot exceed 500 characters']
//   },
//   latitude: { 
//     type: Number, 
//     required: [true, 'Latitude is required'],
//     min: [-90, 'Latitude must be between -90 and 90'],
//     max: [90, 'Latitude must be between -90 and 90']
//   },
//   longitude: { 
//     type: Number, 
//     required: [true, 'Longitude is required'],
//     min: [-180, 'Longitude must be between -180 and 180'],
//     max: [180, 'Longitude must be between -180 and 180']
//   }
// }, { 
//   timestamps: true 
// });

// // Compound index for better query performance
// SearchEntrySchema.index({ user: 1, createdAt: -1 });
// SearchEntrySchema.index({ user: 1, address: 'text' });

// module.exports = mongoose.model('SearchEntry', SearchEntrySchema);