const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};




// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const { validationResult } = require('express-validator');

// exports.signup = async (req, res) => {
//   try {
//     // Check validation results
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ 
//         message: 'Validation failed', 
//         errors: errors.array() 
//       });
//     }

//     const { email, password } = req.body;
    
//     // Check if user already exists
//     let user = await User.findOne({ email: email.toLowerCase() });
//     if (user) {
//       return res.status(400).json({ message: 'User already exists' });
//     }
    
//     // Create new user
//     user = new User({ 
//       email: email.toLowerCase(), 
//       password 
//     });
//     await user.save();
    
//     // Generate JWT token
//     const payload = { 
//       id: user._id,
//       email: user.email 
//     };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    
//     res.status(201).json({ 
//       token,
//       user: {
//         id: user._id,
//         email: user.email
//       }
//     });
//   } catch (err) {
//     console.error('Signup error:', err);
//     res.status(500).json({ message: 'Server error during registration' });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     // Check validation results
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ 
//         message: 'Validation failed', 
//         errors: errors.array() 
//       });
//     }

//     const { email, password } = req.body;
    
//     // Find user by email
//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
    
//     // Check password
//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
    
//     // Generate JWT token
//     const payload = { 
//       id: user._id,
//       email: user.email 
//     };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    
//     res.json({ 
//       token,
//       user: {
//         id: user._id,
//         email: user.email
//       }
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Server error during login' });
//   }
// };

// // Get current user profile
// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     res.json(user);
//   } catch (err) {
//     console.error('Get profile error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };