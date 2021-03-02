const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    allowNull: false,
    defaultValue: 'open'
  }
})

module.exports = Order
