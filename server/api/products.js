const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

// GET /api/products/:id
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    if (product) {
      res.json(product)
    } else {
      res.status(404).send('No product found')
    }
  } catch (error) {
    next(error)
  }
})
