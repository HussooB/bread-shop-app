const Sale = require('../models/Sale');
const Production = require('../models/Production');
const WheatPurchase = require('../models/WheatPurchase');

// Get dashboard summary
const getDashboardSummary = async (req, res) => {
  try {
    const { period } = req.query; // 'daily', 'weekly', 'monthly'
    const now = new Date();
    let startDate;

    switch (period) {
      case 'weekly':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'monthly':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      default: // daily
        startDate = new Date(now.setHours(0, 0, 0, 0));
    }

    // Get sales summary
    const salesSummary = await Sale.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
          totalSales: { $sum: 1 },
          averageSaleAmount: { $avg: '$totalAmount' }
        }
      }
    ]);

    // Get production summary
    const productionSummary = await Production.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: startDate }
        }
      },
      {
        $unwind: '$breadTypes'
      },
      {
        $group: {
          _id: null,
          totalProduction: { $sum: '$breadTypes.quantity' },
          uniqueBreadTypes: { $addToSet: '$breadTypes.type' }
        }
      }
    ]);

    // Get wheat purchase summary
    const wheatSummary = await WheatPurchase.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalWheatPurchased: { $sum: '$quantity' },
          totalWheatCost: { $sum: { $multiply: ['$quantity', '$price'] } },
          averageWheatPrice: { $avg: '$price' }
        }
      }
    ]);

    // Get sales by channel
    const salesByChannel = await Sale.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: startDate }
        }
      },
      {
        $unwind: '$sales'
      },
      {
        $group: {
          _id: '$sales.channel',
          totalQuantity: { $sum: '$sales.quantity' },
          totalRevenue: { $sum: { $multiply: ['$sales.quantity', '$sales.price'] } }
        }
      }
    ]);

    // Get top selling bread types
    const topSellingBreads = await Sale.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: startDate }
        }
      },
      {
        $unwind: '$sales'
      },
      {
        $group: {
          _id: '$sales.breadType',
          totalQuantity: { $sum: '$sales.quantity' },
          totalRevenue: { $sum: { $multiply: ['$sales.quantity', '$sales.price'] } }
        }
      },
      {
        $sort: { totalQuantity: -1 }
      },
      {
        $limit: 5
      }
    ]);

    res.json({
      sales: salesSummary[0] || { totalRevenue: 0, totalSales: 0, averageSaleAmount: 0 },
      production: productionSummary[0] || { totalProduction: 0, uniqueBreadTypes: [] },
      wheat: wheatSummary[0] || { totalWheatPurchased: 0, totalWheatCost: 0, averageWheatPrice: 0 },
      salesByChannel,
      topSellingBreads
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard summary', error: error.message });
  }
};

module.exports = {
  getDashboardSummary
}; 