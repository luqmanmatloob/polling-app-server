// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoutes');
const pollRoutes = require('./routes/pollRoutes');
const voteRoutes = require('./routes/voteRoutes');

// Initialize dotenv for environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());  // Parse JSON body
app.use(cors());          // Enable CORS

// MongoDB connection setup
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);    // Authentication routes (register, login)
app.use('/api/polls', pollRoutes);   // Poll routes (create, publish, get polls)
app.use('/api/votes', voteRoutes);   // Voting routes (cast vote)

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`monogo db uri ${process.env.MONGO_URI}`);
  
});
