const express = require('express')
const verifyFields = require('../middlewares/verify-fields')
const renderScreenshot = require('../middlewares/render-screenshot')

const emallRouter = express.Router()

// 下载变瘦福利官图片
emallRouter
  .get('/welfare/tpl', (req, res) => {
    res.render('emall/welfare')
  })
  .get(
    '/welfare',
    verifyFields([
      'qrcode'
    ]),
    renderScreenshot()
  )

module.exports = emallRouter
