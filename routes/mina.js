const express = require('express')
const auth = require('../middlewares/auth')
const verifyFields = require('../middlewares/verify-fields')
const renderScreenshot = require('../middlewares/render-screenshot')
const base64ToImage = require('../middlewares/base64-to-image')

const minaRouter = express.Router()

minaRouter
  .get('/book_success/tpl', (req, res) => {
    res.render('mina/book_success')
  })
  .get(
    '/book_success',
    auth,
    verifyFields([
      'member_avatar',
      'member_name',
      'course_image',
      'course_name',
      'shop_name',
      'course_image',
      'brand_logo',
      'brand_name',
      'code_image'
    ]),
    renderScreenshot()
  )
  .post(
    '/book_success',
    auth,
    verifyFields([
      'member_avatar',
      'member_name',
      'course_image',
      'course_name',
      'shop_name',
      'course_image',
      'brand_logo',
      'brand_name',
      'code_image'
    ]),
    base64ToImage(),
    renderScreenshot()
  )

minaRouter
  .get('/checkin/tpl', (req, res) => {
    res.render('mina/checkin')
  })
  .get(
    '/checkin',
    auth,
    verifyFields(['brand_logo', 'brand_name', 'course_name', 'code_image']),
    renderScreenshot()
  )
  .post(
    '/checkin',
    auth,
    verifyFields(['brand_logo', 'brand_name', 'course_name', 'code_image']),
    base64ToImage(),
    renderScreenshot()
  )

minaRouter
  .get('/course/tpl', (req, res) => {
    res.render('mina/course')
  })
  .get(
    '/course',
    auth,
    verifyFields([
      'brand_logo',
      'brand_name',
      'shop_name',
      'shop_desc',
      'course_image',
      'course_name',
      'course_count',
      'code_image'
    ]),
    renderScreenshot()
  )
  .post(
    '/course',
    auth,
    verifyFields([
      'brand_logo',
      'brand_name',
      'shop_name',
      'shop_desc',
      'course_image',
      'course_name',
      'course_count',
      'code_image'
    ]),
    base64ToImage(),
    renderScreenshot()
  )

// 名片分享
minaRouter
  .get('/namecard/tpl', (req, res) => {
    res.render('mina/namecard')
  })
  .get(
    '/namecard',
    auth,
    verifyFields([
      'member_avatar',
      'member_name',
      'coach_name',
      'code_image',
      'shop_name'
    ]),
    renderScreenshot()
  )
  .post(
    '/namecard',
    auth,
    verifyFields([
      'member_avatar',
      'member_name',
      'coach_name',
      'code_image',
      'shop_name'
    ]),
    base64ToImage(),
    renderScreenshot()
  )

module.exports = minaRouter
