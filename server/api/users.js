const router = require('express').Router()
const {User} = require('../db/models')
const checkAdmin = require('./checkAdmin')
module.exports = router

router.get('/', checkAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'address', 'admin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', checkAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    if (user) {
      res.json(user)
    } else {
      res.status(404).send('No user found')
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', checkAdmin, async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', checkAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    await user.update(req.body)
    res.send(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', checkAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    await user.destroy()
    //wrap that in an if (to check if they are destroying themselves)
    //when you check req.user.id vs req.params.user.id (check for string vs number)) coerce
    req.session.destroy(err => {
      if (err) return next(err)
      res.redirect('/') // slash users/ or something... 301 status?
      // req.logout for riley, wasn't redirecting, (force refresh?)
      //if we force refresh we can use the Auth file logic.
    })
    res.send()
  } catch (err) {
    next(err)
  }
})
