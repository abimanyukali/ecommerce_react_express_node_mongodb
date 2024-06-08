const router = require('express').Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require('./verifyToken');

//CREATE
router.post('/', verifyTokenAndAuthorization, async (req, res) => {
  //   const newCart =new Cart(req.body);
  try {
    // const savedCart = await newCart.save();
    const savedCart = await Cart.create(req.body);
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//UPDATE
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
//DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const id = req.params._id;
    if (id) {
      await Cart.findByIdAndDelete(id);
      console.log(req.params._id);
      res.status(200).json('cart has been deleted...');
    }
    res.status(400).json('ohhhh no id missing');
  } catch (error) {
    res.status(500).json(error.message);
  }
});
//GET USER CART
router.get('/find/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
//GET ALL
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
module.exports = router;
