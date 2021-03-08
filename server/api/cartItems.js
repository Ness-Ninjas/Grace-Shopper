const router = require('express').Router()
const {CartItems} = require('../db/models')
module.exports = router

console.log('---------------')
console.log(typeof CartItems)
console.log('===============')

// GET /api/cartItems
router.get('/', async (req, res, next) => {
  console.log('getting all items from cart')
  try {
    const cartItems = await CartItems.findAll()
    res.json(cartItems)
  } catch (error) {
    next(error)
  }
})

// GET /api/cart/:id
router.get('/:cartItemId', async (req, res, next) => {
  try {
    const cartItems = await CartItems.findByPk(req.params.cartId)
    if (cart) {
      res.json(cartItems)
    } else {
      res.status(404).send('No cart found')
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const cartItems = await CartItems.create(req.body, {
      where: {
        productId: req.body.productId
      }
    })
    res.send(cartItems)
  } catch (err) {
    next(err)
  }
})

router.put('/:cartItemId', async (req, res, next) => {
  try {
    const cartItems = await CartItems.findByPk(req.params.cartId)
    await cartItems.update(req.body)
    res.send(cart)
  } catch (err) {
    next(err)
  }
})

router.delete('/:cartItemId', async (req, res, next) => {
  //Need to refactor this to get cartId from redux
  console.log('deleting Item....')
  try {
    const cartItems = await CartItems.findOne({
      where: {
        productId: req.params.id,
        cartId: 1
      }
    })
    const {data} = await cartItems.destroy()
    res.status(200).send(data)
  } catch (err) {
    next(err)
  }
})
