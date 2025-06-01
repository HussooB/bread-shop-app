const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createProduction,
  getProductions,
  getProductionSummary,
  updateProduction,
  deleteProduction
} = require('../controllers/productionController');

// All routes require authentication
router.use(auth);

// Create new production record
router.post('/', createProduction);

// Get all production records
router.get('/', getProductions);

// Get production summary
router.get('/summary', getProductionSummary);

// Update production record
router.put('/:id', updateProduction);

// Delete production record
router.delete('/:id', deleteProduction);

module.exports = router;