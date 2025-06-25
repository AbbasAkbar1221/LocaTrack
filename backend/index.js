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




// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const helmet = require('helmet');
// const mongoose = require('mongoose');
// const rateLimit = require('express-rate-limit');

// // Import routes
// const authRoutes = require('./routes/auth');
// const searchRoutes = require('./routes/search');
// const geocodeRoutes = require('./routes/geocode');
// const directionsRoutes = require('./routes/directions');

// dotenv.config();

// const app = express();

// // Security middleware
// app.use(helmet());

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again later.'
// });
// app.use(limiter);

// // CORS configuration
// const corsOptions = {
//   origin: process.env.NODE_ENV === 'production' 
//     ? process.env.FRONTEND_URL 
//     : ['http://localhost:3000', 'http://127.0.0.1:3000'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// };
// app.use(cors(corsOptions));

// // Body parsing middleware
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true }));

// // Connect to MongoDB with better error handling
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected successfully'))
// .catch(err => {
//   console.error(' MongoDB connection error:', err);
//   process.exit(1);
// });

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime()
//   });
// });

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/search', searchRoutes);
// app.use('/api/geocode', geocodeRoutes);
// app.use('/api/directions', directionsRoutes);

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error('Global error:', err);
  
//   if (err.name === 'ValidationError') {
//     return res.status(400).json({ 
//       message: 'Validation Error', 
//       errors: Object.values(err.errors).map(e => e.message) 
//     });
//   }
  
//   if (err.code === 11000) {
//     return res.status(400).json({ message: 'Duplicate field value entered' });
//   }
  
//   res.status(500).json({ 
//     message: process.env.NODE_ENV === 'production' 
//       ? 'Something went wrong' 
//       : err.message 
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(` Server running on port ${PORT}`);
//   console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
// });

// // Graceful shutdown
// process.on('SIGTERM', () => {
//   console.log('SIGTERM received. Shutting down gracefully...');
//   mongoose.connection.close(() => {
//     console.log('MongoDB connection closed.');
//     process.exit(0);
//   });
// });