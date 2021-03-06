const {Cart} = require('../db/models')

const checkLoggedIn = async (req, res, next) => {
  if (req.user) {
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id
      }
    })
    if (Number(req.user.id) === Number(cart.userId)) {
      next()
    } else {
      res.status(403).send('Permission denied')
    }
  } else {
    next()
  }
}

module.exports = checkLoggedIn
