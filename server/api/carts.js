const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.create()
    if (req.user.id) {
      cart.setUser(req.user)
    }
    res.send(cart)
  } catch (err) {
    next(err)
  }
})
