const router = require('express').Router()
const {Cart, CartItems, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const [cart, wasCreated] = await Cart.findOrCreate({
        where: {
          userId: req.user.id,
          status: 'open'
        }
      })
      res.send(cart.dataValues)
    } else {
      res.send()
    }
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  console.log('==================PUT CART============================')
  console.log(req.user.dataValues)
  console.log(req.user.id)
  try {
    const openCart = await Cart.findOne({
      where: {
        userId: req.user.id,
        status: 'open'
      }
    })
    console.log(openCart)
    await openCart.update(req.body)
    res.status(200).send(openCart)
  } catch (error) {
    res.status(403).send(error)
  }
})

// router.put('/', async (req, res, next) => {
//   try {
//     const user = User.findOne({where: {email: req.body.email}})
//     const possibleCart = await Cart.findOne({
//       where: {
//         userId: user.id,
//         status: 'open',
//       },
//     })
//     if (possibleCart) {
//       const items = await CartItems.findAll({
//         where: {cartId: req.body.currentActiveCart.id},
//       })
//       items.forEach((item) => {
//         item.update({cartId: possibleCart.id})
//       })
//       //destroy guest cart???
//       res.send(possibleCart)
//     } else {
//       const cart = await Cart.findByPk(req.body.currentActiveCart.id)
//       await cart.setUser(user)
//       res.send(cart)
//     }
//   } catch (err) {
//     next(err)
//   }
// })
