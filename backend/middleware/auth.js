const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  let token = req.header('Authorization');
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  token = token.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};



// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// module.exports = async (req, res, next) => {
//   try {
//     let token = req.header('Authorization');
    
//     if (!token || !token.startsWith('Bearer ')) {
//       return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }
    
//     token = token.split(' ')[1];
    
//     if (!process.env.JWT_SECRET) {
//       return res.status(500).json({ message: 'JWT secret not configured' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select('-password');
    
//     if (!user) {
//       return res.status(401).json({ message: 'Token is not valid - user not found' });
//     }
    
//     req.user = user;
//     next();
//   } catch (err) {
//     console.error('Auth middleware error:', err);
    
//     if (err.name === 'JsonWebTokenError') {
//       return res.status(401).json({ message: 'Invalid token' });
//     }
    
//     if (err.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: 'Token expired' });
//     }
    
//     res.status(401).json({ message: 'Token verification failed' });
//   }
// };
