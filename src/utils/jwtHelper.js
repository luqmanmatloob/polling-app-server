const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId, role) => {
  console.log(process.env.JWT_SECRET); // Log secret to ensure it's being used
  return jwt.sign({ id: userId, role: role }, process.env.JWT_SECRET, {
    expiresIn: '90d', // Token expiry time
  });
};

// // Verify JWT Token
// const verifyToken = (token) => {
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(process.env.JWT_SECRET); // Log secret to ensure it's being used
//     return decoded;
//   } catch (error) {
//     console.log('Invalid token:', error); // Log the error if verification fails
//     return null; // Invalid token
//   }
// };

module.exports = { generateToken };
