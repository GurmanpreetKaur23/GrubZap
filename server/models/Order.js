const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Order = sequelize.define('Order', {
  items: DataTypes.JSON,
  total: DataTypes.FLOAT,
  status: {
    type: DataTypes.ENUM('pending', 'preparing', 'delivered'),
    defaultValue: 'pending'
  }
});

User.hasMany(Order);
Order.belongsTo(User);

module.exports = Order;
