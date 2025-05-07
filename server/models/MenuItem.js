const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Restaurant = require('./Restaurant');

const MenuItem = sequelize.define('MenuItem', {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  price: DataTypes.FLOAT,
  image: DataTypes.STRING
});

Restaurant.hasMany(MenuItem);
MenuItem.belongsTo(Restaurant);

module.exports = MenuItem;
