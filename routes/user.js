const express = require('express')
const config = require('../config')
const moment = require('moment')
const jwt = require('jwt-simple')
const _ = require('lodash')

const userRouter = express.Router()

userRouter.post('/token', (req, res, next) => {
  const token = jwt.encode(
    {
      exp: moment()
        .add(...config.exp)
        .valueOf()
    },
    config.secret
  )

  res.json({
    code: 200,
    data: {
      token: token
    },
    msg: 'ok'
  })
})

module.exports = userRouter
