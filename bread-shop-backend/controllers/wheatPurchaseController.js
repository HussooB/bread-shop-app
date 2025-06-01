const WheatPurchase = require('../models/WheatPurchase');

// Create new wheat purchase record
const createWheatPurchase = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity) {
      return res.status(400).json({ message: 'Quantity is required.' });
    }
    const wheatPurchase = new WheatPurchase({
      userId: req.user._id,
      quantity,
      date: new Date()
    });
    await wheatPurchase.save();
    res.status(201).json(wheatPurchase);
  } catch (error) {
    res.status(500).json({ message: 'Error creating wheat purchase record', error: error.message });
  }
};

// Get all wheat purchase records
const getWheatPurchases = async (req, res) => {
  try {
    const wheatPurchases = await WheatPurchase.find({ userId: req.user._id })
      .sort({ date: -1 });
    res.json(wheatPurchases);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wheat purchases', error: error.message });
  }
};

// Get wheat purchase summary
const getWheatPurchaseSummary = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const wheatPurchases = await WheatPurchase.find({
      userId: req.user._id,
      date: { $gte: start, $lte: end }
    });

    const totalQuantity = wheatPurchases.reduce((sum, purchase) => sum + purchase.quantity, 0);
    res.json({ totalQuantity });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wheat purchase summary', error: error.message });
  }
};

// Update wheat purchase record
const updateWheatPurchase = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    const wheatPurchase = await WheatPurchase.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { quantity },
      { new: true }
    );
    
    if (!wheatPurchase) {
      return res.status(404).json({ message: 'Wheat purchase record not found' });
    }
    
    res.json(wheatPurchase);
  } catch (error) {
    res.status(500).json({ message: 'Error updating wheat purchase', error: error.message });
  }
};

// Delete wheat purchase record
const deleteWheatPurchase = async (req, res) => {
  try {
    const { id } = req.params;
    const wheatPurchase = await WheatPurchase.findOneAndDelete({ _id: id, userId: req.user._id });
    
    if (!wheatPurchase) {
      return res.status(404).json({ message: 'Wheat purchase record not found' });
    }
    
    res.json({ message: 'Wheat purchase record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting wheat purchase', error: error.message });
  }
};

module.exports = {
  createWheatPurchase,
  getWheatPurchases,
  getWheatPurchaseSummary,
  updateWheatPurchase,
  deleteWheatPurchase
};