const express = require("express");
const auth = require("../middlewares/auth");
const verifyFields = require("../middlewares/verify-fields");
const renderScreenshot = require("../middlewares/render-screenshot");
const base64ToImage = require('../middlewares/base64-to-image');

const saasRouter = express.Router();

saasRouter
  .get("/poster/tpl", (req, res) => {
    res.render("saas/poster");
  })
  .get(
    "/poster",
    auth,
    verifyFields(["brand_logo", "brand_name", "price", "qrcode_url"]),
    renderScreenshot({ quality: 95 })
  )
  .post(
    "/poster",
    auth,
    verifyFields(["brand_logo", "brand_name", "price", "qrcode_url"]),
    base64ToImage(),
    renderScreenshot({ quality: 95 })
  )
  .get("/lottery_poster/tpl", (req, res) => {
    res.render("saas/lottery_poster");
  })
  .get(
    "/lottery_poster",
    auth,
    verifyFields(["sub_name", "qrcode_url"]),
    renderScreenshot({ quality: 95 })
  )
  .post(
    "/lottery_poster",
    auth,
    verifyFields(["sub_name", "qrcode_url"]),
    base64ToImage(),
    renderScreenshot({ quality: 95 })
  )
  .get("/activity/tpl", (req, res) => {
    res.render("saas/activity");
  })
  .get(
    "/activity",
    verifyFields(["qrcode_url", "brand_name", "brand_logo", "activity_img", "activity_title", "activity_date", "activity_address"]),
    renderScreenshot({ quality: 95 })
  )
  .post(
    "/activity",
    verifyFields(["qrcode_url", "brand_name", "brand_logo", "activity_img", "activity_title", "activity_date", "activity_address"]),
    base64ToImage(),
    renderScreenshot({ quality: 95 })
  )
  .get('/time_table/tpl', (req, res) => {
    res.render('saas/time_table')
  })
  .get(
    '/time_table',
    verifyFields(['bgUrl', 'qrcode_url', 'is_bgimage', 'is_show_nickname', 'is_show_strength_level', 'brand_log', 'shop_name', 'rangeTime', 'title', 'timeTableList', 'prompt_message']),
    renderScreenshot({ quality: 95 })
  )
  .post(
    '/time_table',
    verifyFields(['bgUrl', 'qrcode_url',  'is_bgimage', 'is_show_nickname', 'is_show_strength_level', 'brand_log', 'shop_name', 'rangeTime', 'title', 'timeTableList', 'prompt_message']),
    base64ToImage(),
    renderScreenshot({ quality: 95, vw: 2480 })
  );

saasRouter
  .get("/activity_qrcode/tpl", (req, res) => {
    res.render("saas/activity_qrcode");
  })
  .get(
    "/activity_qrcode",
    auth,
    verifyFields(["title", "sub_title", "name", "qrcode_url"]),
    renderScreenshot({ quality: 95, vw: 368, vh: 418 })
  )
  .post(
    "/activity_qrcode",
    auth,
    verifyFields(["title", "sub_title", "name", "qrcode_url"]),
    base64ToImage(),
    renderScreenshot({ quality: 95, vw: 368, vh: 418 })
  );
  

module.exports = saasRouter;
