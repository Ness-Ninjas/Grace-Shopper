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
    if (req.user) {
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
    } else {
      res.send()
    }
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

router.put('/edit', async (req, res, next) => {
  try {
    if (req.user) {
      const cartItem = await CartItems.findOne({
        where: {
          productId: req.body.id
        }
      })
      await cartItem.update({quantity: req.body.quantity})
      res.send(cartItem)
    } else {
      res.send()
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  //Need to refactor this to get cartId from redux
  console.log('deleting Item....')
  try {
    if (req.user) {
      const cart = await Cart.findOne({where: {userId: req.user.id}})
      const cartItem = await CartItems.findOne({
        where: {
          productId: req.params.productId,
          cartId: cart.id
        }
      })
      await cartItem.destroy()
      res.status(200).send()
    } else {
      res.send()
    }
  } catch (err) {
    next(err)
  }
})
