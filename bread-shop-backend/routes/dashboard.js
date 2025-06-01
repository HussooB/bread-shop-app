const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { getDashboardSummary } = require('../controllers/dashboardController');

// All routes require authentication
router.use(auth);

// Get dashboard summary
router.get('/summary', getDashboardSummary);

module.exports = router; 