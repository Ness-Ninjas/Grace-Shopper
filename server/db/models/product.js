const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  description: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  category: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  imageUrlOne: {
    type: Sequelize.STRING,
    defaultValue:
      'https://forestprod.org/global_graphics/default-store-350x350.jpg'
  },
  imageUrlTwo: {
    type: Sequelize.STRING,
    defaultValue:
      'https://forestprod.org/global_graphics/default-store-350x350.jpg'
  },
  imageUrlThree: {
    type: Sequelize.STRING,
    defaultValue:
      'https://forestprod.org/global_graphics/default-store-350x350.jpg'
  }
})

Product.beforeValidate(product => {
  console.log('1', product.price)
  product.price = Math.round(+product.price * 100)
  console.log('2', product.price)
})

module.exports = Product
