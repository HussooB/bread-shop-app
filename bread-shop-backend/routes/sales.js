const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createSale,
  getSales,
  getSalesSummary,
  getSalesByPaymentMethod,
  updateSale,
  deleteSale
} = require('../controllers/salesController');

// All routes require authentication
router.use(auth);

// Create new sale record
router.post('/', createSale);

// Get all sales records
router.get('/', getSales);

// Get sales summary
router.get('/summary', getSalesSummary);

// Get sales by payment method
router.get('/payment-methods', getSalesByPaymentMethod);

// Update sale record
router.put('/:id', updateSale);

// Delete sale record
router.delete('/:id', deleteSale);

module.exports = router; 