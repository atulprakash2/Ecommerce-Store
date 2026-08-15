const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

// @route   GET /api/cart
router.get('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/cart - add item
router.post('/', protect, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/cart/:itemId - update quantity
router.put('/:itemId', protect, async (req, res) => {
  const { quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const item = cart.items.id(req.params.itemId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
      cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/cart/:itemId - remove item
router.delete('/:itemId', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    cart.items.pull({ _id: req.params.itemId });
    await cart.save();
    cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/cart - clear cart
router.delete('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
      cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
