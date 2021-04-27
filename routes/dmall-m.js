const express = require('express')
const auth = require('../middlewares/auth')
const verifyFields = require('../middlewares/verify-fields')
const renderScreenshot = require('../middlewares/render-screenshot')

const minaRouter = express.Router()

minaRouter
  .get('/bill/tpl', (req, res) => {
    res.render('dmall-m/bill')
  })
  .get(
    '/bill',
    auth,
    verifyFields([
      'user_name',
      'user_img',
      'goods_img',
      'goods_name',
      'code_img',
      'goods_price'
    ]),
    renderScreenshot()
  )
  .post(
    '/bill',
    auth,
    verifyFields([
      'user_name',
      'user_img',
      'goods_img',
      'goods_name',
      'code_img',
      'goods_price'
    ]),
    renderScreenshot()
  )

  minaRouter
  .get('/invite/tpl', (req, res) => {
    res.render('dmall-m/invite')
  })
  .get(
    '/invite',
    auth,
    verifyFields([
      'bg_img',
      'leader_name',
      'leader_avatar',
      'poster_code',
      'poster_des'
    ]),
    renderScreenshot()
  )
  .post(
    '/invite',
    auth,
    verifyFields([
      'bg_img',
      'leader_name',
      'leader_avatar',
      'poster_code',
      'poster_des'
    ]),
    renderScreenshot()
  )
module.exports = minaRouter
