const Production = require('../models/Production');

const createProduction = async (req, res) => {
  try {


    const { breadTypes } = req.body;
    if (!breadTypes || !Array.isArray(breadTypes) || breadTypes.length === 0) {
      console.log('Validation failed: breadTypes missing or empty');
      return res.status(400).json({ message: 'At least one bread type and quantity is required.' });
    }

    // Validate each entry
    for (const entry of breadTypes) {
      if (!entry.breadType || typeof entry.quantity !== 'number' || entry.quantity <= 0) {
        console.log('Validation failed for entry:', entry);
        return res.status(400).json({ message: 'Each bread type and quantity is required and must be a positive number.' });
      }
    }

    const production = new Production({
      userId: req.user._id,
      breadTypes,
      date: new Date()
    });

    await production.save();
  

    res.status(201).json(production);
  } catch (error) {
    console.error('Error in createProduction:', error);
    res.status(500).json({ message: 'Error creating production record', error: error.message });
  }
};


// Get all production records
const getProductions = async (req, res) => {
  try {
    const productions = await Production.find({ userId: req.user._id })
      .sort({ date: -1 });
    res.json(productions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching productions', error: error.message });
  }
};

// Get production summary
const getProductionSummary = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const summary = await Production.aggregate([
      { $match: { userId: req.user._id, date: { $gte: start, $lte: end } } },
      { $unwind: '$breadTypes' },
      { $group: {
          _id: '$breadTypes.breadType',
          total: { $sum: '$breadTypes.quantity' }
        }
      }
    ]);
    // Convert to { '6birr': 10, ... }
    const result = {};
    summary.forEach(item => { result[item._id] = item.total; });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching production summary', error: error.message });
  }
};

// Update production record
const updateProduction = async (req, res) => {
  try {
    const { id } = req.params;
    const { breadType, quantity } = req.body;
    
    const production = await Production.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { breadType, quantity },
      { new: true }
    );
    
    if (!production) {
      return res.status(404).json({ message: 'Production record not found' });
    }
    
    res.json(production);
  } catch (error) {
    res.status(500).json({ message: 'Error updating production', error: error.message });
  }
};

// Delete production record
const deleteProduction = async (req, res) => {
  try {
    const { id } = req.params;
    const production = await Production.findOneAndDelete({ _id: id, userId: req.user._id });
    
    if (!production) {
      return res.status(404).json({ message: 'Production record not found' });
    }
    
    res.json({ message: 'Production record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting production', error: error.message });
  }
};

module.exports = {
  createProduction,
  getProductions,
  getProductionSummary,
  updateProduction,
  deleteProduction
};