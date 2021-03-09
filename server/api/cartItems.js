const router = require('express').Router()
const {CartItems, Cart} = require('../db/models')
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
    // find cart id and match this
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id
      }
    })
    // create a new row
    const cartItems = await CartItems.create({
      cartId: cart.id,
      productId: req.body.id
    })
    res.send(cartItems)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    // console.log('INCOMING', req.body)
    // const cart = await Cart.findOne({
    //   where: {
    //     userId: req.user.id,
    //   },
    // })
    // const incomingItems = req.body
    // incomingItems.map(async (item) => {
    //   item = await CartItems.create(item)
    //   item.setCart(cart)
    //   return item
    // })
    // res.send(incomingItems)
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
