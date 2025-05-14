const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/RestaurantController');

router.get('/by-location', restaurantController.getRestaurantsByLocation);

module.exports = router;
