const Production = require('../models/Production');
const Sale = require('../models/Sale');

const getTodaySummary = async (req, res) => {
  try {
    // Production
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const prodSummary = await Production.aggregate([
      { $match: { userId: req.user._id, date: { $gte: start, $lte: end } } },
      { $group: { _id: '$breadType', total: { $sum: '$quantity' } } }
    ]);
    const production = {};
    prodSummary.forEach(item => { production[item._id] = item.total; });

    // Sales
    const salesDocs = await Sale.find({ userId: req.user._id, date: { $gte: start, $lte: end } });
    let hotels = 0, markets = 0, shop = 0, revenue = 0;
    salesDocs.forEach(s => {
      hotels += s.hotels;
      markets += s.markets;
      shop += s.shop;
      revenue += (s.hotels + s.markets + s.shop) * s.unitPrice;
    });

    res.json({
      production,
      sales: { hotels, markets, shop },
      revenue
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching summary', error: error.message });
  }
};

module.exports = { getTodaySummary };