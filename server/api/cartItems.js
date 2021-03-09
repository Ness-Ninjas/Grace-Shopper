const router = require('express').Router()
const {CartItems, Cart} = require('../db/models')
module.exports = router

// GET /api/cartItems
router.get('/', async (req, res, next) => {
  //console.log('getting all items from cart')
  try {
    const cartItems = await CartItems.findAll()
    res.json(cartItems)
  } catch (error) {
    next(error)
  }
})

// GET /api/cartItems/:id
router.get('/:cartItemId', async (req, res, next) => {
  console.log('cartItemsId test: ', req.params)
  try {
    const cartItems = await CartItems.findByPk(req.params.cartItemId)
    if (cartItems) {
      res.json(cartItems)
    } else {
      res.status(404).send('No cart found')
    }
  } catch (error) {
    next(error)
  }
})

// POST /api/cartItems/
router.post('/', async (req, res, next) => {
  //console.log('======================req.body============================')
  //console.log(req.body)
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

// PUT /api/cartItems/
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
      res.status(200).send(cartItem)
    } else {
      res.status(403).send('Unable to update cartItem')
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  //Need to refactor this to get cartId from redux
  let userName = req.user.dataValues.email.split('@')[0]
  userName = userName.charAt(0).toUpperCase() + userName.slice(1)
  console.log(
    `${userName} is about to delete Item: ${req.params.productId} from the cart`
  )
  try {
    if (req.user) {
      const cart = await Cart.findOne({where: {userId: req.user.id}})
      const cartItem = await CartItems.findOne({
        where: {
          productId: req.params.productId,
          cartId: cart.id
        }
      })
      //console.log('cartItem: ', cartItem)
      await cartItem.destroy()
      res
        .status(200)
        .send(
          `${userName} deleted cartItem: , ${
            req.params.productId
          } from the cart`
        )
    } else {
      res
        .status(403)
        .send(
          `${userName} we were not able to delete ${
            req.params.productId
          } from the cart`
        )
    }
  } catch (err) {
    next(err)
  }
})
