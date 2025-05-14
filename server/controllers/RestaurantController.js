const Restaurant = require('../models/RestaurantModel');

// Controller to fetch restaurants based on location (latitude and longitude)
exports.getRestaurantsByLocation = async (req, res) => {
  try {
    const { latitude, longitude, radius = 10 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ success: false, message: 'Latitude and longitude are required' });
    }

    // Assuming Restaurant model has a location field with GeoJSON Point type
    // radius is in kilometers, convert to meters for MongoDB
    const radiusInMeters = radius * 1000;

    const restaurants = await Restaurant.find({
      location: {
        $geoWithin: {
          $centerSphere: [[parseFloat(longitude), parseFloat(latitude)], radiusInMeters / 6378137]
        }
      }
    });

    res.json({ success: true, data: restaurants });
  } catch (error) {
    console.error('Error fetching restaurants by location:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
