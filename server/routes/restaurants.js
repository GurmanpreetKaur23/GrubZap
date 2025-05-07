const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

// Get all restaurants
router.get('/', async (req, res) => {
  const data = await Restaurant.findAll({ include: MenuItem });
  res.json(data);
});

module.exports = router;
