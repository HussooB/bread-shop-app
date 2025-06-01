const Sale = require('../models/Sale');

// Create new sale record
const createSale = async (req, res) => {
  try {
    const { hotels, markets, shop, unitPrice } = req.body;
    if (hotels == null || markets == null || shop == null || unitPrice == null) {
      return res.status(400).json({ message: 'All sales fields are required.' });
    }
    const sale = new Sale({
      userId: req.user._id,
      hotels,
      markets,
      shop,
      unitPrice,
      date: new Date()
    });
    await sale.save();
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: 'Error creating sale record', error: error.message });
  }
};

// Get all sales records
const getSales = async (req, res) => {
  try {
    const sales = await Sale.find({ userId: req.user._id })
      .sort({ date: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales', error: error.message });
  }
};

// Get sales summary
const getSalesSummary = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const sales = await Sale.find({
      userId: req.user._id,
      date: { $gte: start, $lte: end }
    });

    // Sum up sales
    let hotels = 0, markets = 0, shop = 0, revenue = 0;
    sales.forEach(s => {
      hotels += s.hotels;
      markets += s.markets;
      shop += s.shop;
      revenue += (s.hotels + s.markets + s.shop) * s.unitPrice;
    });

    res.json({ hotels, markets, shop, revenue });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales summary', error: error.message });
  }
};

// Get sales by payment method
const getSalesByPaymentMethod = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const sales = await Sale.find({
      userId: req.user._id,
      date: { $gte: start, $lte: end }
    });

    const summary = {
      hotels: sales.reduce((sum, sale) => sum + sale.hotels, 0),
      markets: sales.reduce((sum, sale) => sum + sale.markets, 0),
      shop: sales.reduce((sum, sale) => sum + sale.shop, 0)
    };

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales by payment method', error: error.message });
  }
};

// Update sale record
const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { hotels, markets, shop, unitPrice } = req.body;
    
    const sale = await Sale.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { hotels, markets, shop, unitPrice },
      { new: true }
    );
    
    if (!sale) {
      return res.status(404).json({ message: 'Sale record not found' });
    }
    
    res.json(sale);
  } catch (error) {
    res.status(500).json({ message: 'Error updating sale', error: error.message });
  }
};

// Delete sale record
const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findOneAndDelete({ _id: id, userId: req.user._id });
    
    if (!sale) {
      return res.status(404).json({ message: 'Sale record not found' });
    }
    
    res.json({ message: 'Sale record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sale', error: error.message });
  }
};

module.exports = {
  createSale,
  getSales,
  getSalesSummary,
  getSalesByPaymentMethod,
  updateSale,
  deleteSale
};