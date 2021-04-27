/**
 * saas 1.0 会员端
 */
const express = require('express')
const auth = require('../middlewares/auth')
const verifyFields = require('../middlewares/verify-fields')
const renderScreenshot = require('../middlewares/render-screenshot')

const mRouter = express.Router()

/**
 * 在线视频课程分享
 */
mRouter
  .get('/course/tpl', (req, res) => {
    res.render('m/course')
  })
  .get(
    '/course',
    auth,
    verifyFields([
      'course_name',
      'course_image',
      'code_image'
    ]),
    renderScreenshot()
  )

module.exports = mRouter
