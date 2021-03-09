const router = require('express').Router()
const {CartItems, Cart, Product} = require('../db/models')
module.exports = router

console.log('---------------')
console.log(typeof CartItems)
console.log('===============')

// GET /api/cartItems
//**** DONT NEED TO GET ALL ITEMS
// router.get('/', async (req, res, next) => {
//   console.log('getting all items from cart')
//   try {
//     let cartItems = await CartItems.findAll({
//       where: {
//         cartId: req.params.cartId,
//       },
//     })
//     cartItems = cartItems.map(async (item) => {
//       const product = await Product.findByPk(item.productId)
//       const clone = {
//         id: product.id,
//         name: product.name,
//         price: item.currentPrice,
//         quantity: item.quantity,
//         description: product.description,
//         category: product.category,
//         imageUrlOne: product.imageUrlOne,
//         imageUrlTwo: product.imageUrlTwo,
//         imageUrlThree: product.imageUrlThree,
//       }
//       return clone
//     })
//     res.send(cartItems)
//   } catch (error) {
//     next(error)
//   }
// })

// GET /api/cart/:id
router.get('/:cartId', async (req, res, next) => {
  try {
    let cart = await Cart.findOne({
      where: {
        id: req.params.cartId
      },
      include: [{model: Product}]
    })
    res.send(cart.products)
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
      const exists = await CartItems.findOne({
        where: {
          productId: req.body.id,
          cartId: cart.id
        }
      })

      if (exists) {
        exists.update({quantity: exists.quantity + req.body.quantity})
        res.send(exists)
      } else {
        // create a new row
        const cartItem = await CartItems.create({
          cartId: cart.id,
          productId: req.body.id,
          quantity: req.body.quantity,
          currentPrice: req.body.price
        })
        res.send(cartItem)
      }
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
