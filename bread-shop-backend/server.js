const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/auth');
const productionRoutes = require('./routes/production');
const salesRoutes = require('./routes/sales');
const wheatPurchaseRoutes = require('./routes/wheatPurchase');
const dashboardRoutes = require('./routes/dashboard');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/production', productionRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/wheat', wheatPurchaseRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/user', require('./routes/user'));
app.use('/api/summary', require('./routes/summary'));
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(5000, '0.0.0.0', () => {
  console.log('Server is running on port 5000');
});
