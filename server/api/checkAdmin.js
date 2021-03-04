const checkAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    res.status(403).send('Permission denied')
  }
}

module.exports = checkAdmin
