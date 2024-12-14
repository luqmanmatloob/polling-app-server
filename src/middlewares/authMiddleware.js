const jwt = require('jsonwebtoken');
const User = require('../models/User');




exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token after 'Bearer'
  console.log('Token:', token);  // Log token to check if it's received

  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    
    console.log('Decoded Token:', decoded);  // Log decoded token to check the payload
    req.userId = decoded.id;
    req.role = decoded.role;
    console.log('User ID:', req.userId);  // Log user ID to check if it's received
    next();
  });
};



exports.isAdmin = (req, res, next) => {
  if (req.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  next();
};
