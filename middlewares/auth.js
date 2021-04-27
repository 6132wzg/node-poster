const config = require('../config')
const jwt = require('jwt-simple')

module.exports = (req, res, next) => {
  const token = (
    req.headers['x-token'] ||
    req.body.token ||
    req.query.token
  ) || ''.trim()
  if (token === config.adminToken) {
    return next()
  }
  let decoded
  try {
    decoded = jwt.decode(token, config.secret)
  } catch (e) {
    res.status(401).json({
      code: 401,
      data: null,
      msg: 'token无效'
    })
    return
  }

  if (decoded.exp < Date.now()) {
    res.status(401).json({
      code: 401,
      data: null,
      msg: 'token已过期'
    })
  } else {
    next()
  }
}
