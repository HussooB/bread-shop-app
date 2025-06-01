const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { getTodaySummary } = require('../controllers/summaryController');

router.use(auth);
router.get('/today', getTodaySummary);

module.exports = router;