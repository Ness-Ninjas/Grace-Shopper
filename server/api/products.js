const router = require('express').Router()
const {Product} = require('../db/models')
const checkAdmin = require('./checkAdmin')
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
router.get('/:productId', checkAdmin, async (req, res, next) => {
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

router.post('/', checkAdmin, async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.send(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', checkAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    await product.update(req.body)
    res.send(product)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', checkAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    await product.destroy()
    res.send()
  } catch (err) {
    next(err)
  }
})
