const express = require('express');
const auth = require('../middlewares/auth');
const verifyFields = require('../middlewares/verify-fields');
const renderScreenshot = require('../middlewares/render-screenshot');

const otherRouter = express.Router();

otherRouter
  .get('/brand-poster/tpl', (req, res) => {
    res.render('other/brand-poster');
  })
  .get(
    '/brand-poster/',
    auth,
    verifyFields(['brand_logo', 'brand_name', 'qrcode_url']),
    renderScreenshot({ quality: 95 })
  )
  .post(
    '/brand-poster/',
    auth,
    verifyFields(['brand_logo', 'brand_name', 'qrcode_url']),
    renderScreenshot({ quality: 95 })
  )
  .get('/yearly-keywords/tpl', (req, res) => {
    res.render('other/yearly-keywords');
  })
  .get(
    '/yearly-keywords/',
    auth,
    verifyFields(['keywords']),
    renderScreenshot({ quality: 95 })
  )
  
module.exports = otherRouter;
