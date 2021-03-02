const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  description: {
    type: Sequelize.TEXT
  },
  category: {
    type: Sequelize.STRING
  },
  imageUrlOne: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://forestprod.org/global_graphics/default-store-350x350.jpg'
  },
  imageUrlTwo: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://forestprod.org/global_graphics/default-store-350x350.jpg'
  },
  imageUrlThree: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://forestprod.org/global_graphics/default-store-350x350.jpg'
  }
})

module.exports = Product
