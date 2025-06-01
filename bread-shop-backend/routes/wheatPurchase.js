const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createWheatPurchase,
  getWheatPurchases,
  getWheatPurchaseSummary,
  updateWheatPurchase,
  deleteWheatPurchase
} = require('../controllers/wheatPurchaseController');

// All routes require authentication
router.use(auth);

// Create new wheat purchase record
router.post('/', createWheatPurchase);

// Get all wheat purchase records
router.get('/', getWheatPurchases);

// Get wheat purchase summary
router.get('/summary', getWheatPurchaseSummary);

// Update wheat purchase record
router.put('/:id', updateWheatPurchase);

// Delete wheat purchase record
router.delete('/:id', deleteWheatPurchase);

module.exports = router; 