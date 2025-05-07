const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Restaurant = sequelize.define('Restaurant', {
  name: DataTypes.STRING,
  location: DataTypes.STRING,
  image: DataTypes.STRING
});

module.exports = Restaurant;
