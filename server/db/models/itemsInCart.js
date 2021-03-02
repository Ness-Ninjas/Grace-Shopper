const Sequelize = require('sequelize')
const db = require('../db')

const ItemsInCart = db.define('itemsInCart', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = ItemsInCart
