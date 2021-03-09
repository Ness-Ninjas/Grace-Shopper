const {Cart} = require('../db/models')

const checkLoggedIn = (req, res, next) => {
  const userId = Cart.findByPk(req.params.cartId).userId
  if (Number(req.user.id) === Number(userId)) {
    next()
  } else {
    res.status(403).send('Permission denied')
  }
}

module.exports = checkLoggedIn
