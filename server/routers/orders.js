const router = require('express').Router();
const Order = require('../models/Orders');
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');

//CREATE
router.post('/', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json('Order has been deleted ...!');
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//GET USER ORDERS
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME

router.get('/income', verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  console.log(date);
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  console.log(date);
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount',
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
