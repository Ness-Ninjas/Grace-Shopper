const Sequelize = require('sequelize')
const db = require('../db')

const CartItems = db.define('cartItems', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  currentPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  }
})

module.exports = CartItems
