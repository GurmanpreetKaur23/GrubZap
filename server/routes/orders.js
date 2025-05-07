const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Place new order
router.post('/', async (req, res) => {
  const { userId, items, total } = req.body;
  const order = await Order.create({ UserId: userId, items, total });
  res.json(order);
});

// Get orders (admin or user)
router.get('/', async (req, res) => {
  const orders = await Order.findAll();
  res.json(orders);
});

module.exports = router;
