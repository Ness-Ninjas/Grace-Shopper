const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  date: {
    type: Sequelize.DATE
  },
  totalPrice: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    allowNull: false,
    defaultValue: 'open'
  }
})

module.exports = Cart
