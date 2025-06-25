const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');
const geocodeRoutes = require('./routes/geocode');
const directionsRoutes = require('./routes/directions');
const authMiddleware = require('./middleware/auth');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// // Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/search', authMiddleware, searchRoutes);
app.use('/api/geocode', authMiddleware, geocodeRoutes);
app.use('/api/directions', authMiddleware, directionsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));