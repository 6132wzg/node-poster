const express = require('express')
const auth = require('../middlewares/auth')
const verifyFields = require('../middlewares/verify-fields')
const renderScreenshot = require('../middlewares/render-screenshot')
const base64ToImage = require('../middlewares/base64-to-image')

const minaRouter = express.Router()
minaRouter
  .get('/index/tpl', (req, res) => {
    res.render('poster')
  })
  .get(
    '/index',
    // auth,
    verifyFields([]),
    renderScreenshot()
  )
  .post(
    '/index',
    // auth,
    verifyFields([]),
    base64ToImage(),
    renderScreenshot()
  )


module.exports = minaRouter
