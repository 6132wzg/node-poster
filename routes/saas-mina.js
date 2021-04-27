const express = require("express");
const verifyFields = require("../middlewares/verify-fields");
const renderScreenshot = require("../middlewares/render-screenshot");
const base64ToImage = require("../middlewares/base64-to-image");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const saasMinaRouter = express.Router();

// 邀请有礼分享海报模板0（自定义背景）
saasMinaRouter
  .get("/invitation/0/tpl", (req, res) => {
    res.render("saas-mina/invitation/0");
  })
  .get(
    "/invitation/0",
    verifyFields(["invitation_bg", "qrcode", "user_name"]),
    renderScreenshot()
  )
  .post(
    "/invitation/0",
    verifyFields(["invitation_bg", "qrcode", "user_name"]),
    base64ToImage(),
    renderScreenshot()
  );
// 邀请有礼分享海报模板1
saasMinaRouter
  .get("/invitation/1/tpl", (req, res) => {
    res.render("saas-mina/invitation/1");
  })
  .get(
    "/invitation/1",
    verifyFields([
      "invitation_bg",
      "user_avatar",
      "user_name",
      "brand_logo",
      "price",
      "coupon_name",
      "qrcode",
    ]),
    renderScreenshot()
  )
  .post(
    "/invitation/1",
    verifyFields([
      "invitation_bg",
      "user_avatar",
      "user_name",
      "brand_logo",
      "price",
      "coupon_name",
      "qrcode",
    ]),
    base64ToImage(),
    renderScreenshot()
  );
// 邀请有礼分享海报模板2
saasMinaRouter
  .get("/invitation/2/tpl", (req, res) => {
    res.render("saas-mina/invitation/2");
  })
  .get(
    "/invitation/2",
    verifyFields([
      "invitation_bg",
      "brand_logo",
      "price",
      "user_name",
      "qrcode",
    ]),
    renderScreenshot()
  )
  .post(
    "/invitation/2",
    verifyFields([
      "invitation_bg",
      "brand_logo",
      "price",
      "user_name",
      "qrcode",
    ]),
    base64ToImage(),
    renderScreenshot()
  );
// 邀请有礼分享海报模板3
saasMinaRouter
  .get("/invitation/3/tpl", (req, res) => {
    res.render("saas-mina/invitation/3");
  })
  .get(
    "/invitation/3",
    verifyFields(["invitation_bg", "qrcode", "user_name"]),
    renderScreenshot()
  )
  .post(
    "/invitation/3",
    verifyFields(["invitation_bg", "qrcode", "user_name"]),
    base64ToImage(),
    renderScreenshot()
  );

// 预约成功分享海报
saasMinaRouter
  .get("/reserve/tpl", (req, res) => {
    res.render("saas-mina/reserve");
  })
  .get(
    "/reserve",
    verifyFields([
      "reserve_bg",
      "shop_logo",
      "shop_name",
      "course_name",
      "course_time",
      "qrcode",
    ]),
    renderScreenshot()
  )
  .get("/reserve_success/tpl", (req, res) => {
    res.render("saas-mina/reserve_success");
  })
  .get(
    "/reserve_success",
    verifyFields([
      "course_img",
      "shop_logo",
      "shop_name",
      "course_name",
      "course_time",
      "qrcode",
      "shop_address"
    ]),
    renderScreenshot()
  )
  .post(
    "/reserve",
    verifyFields([
      "reserve_bg",
      "shop_logo",
      "shop_name",
      "course_name",
      "course_time",
      "qrcode",
    ]),
    base64ToImage(),
    renderScreenshot()
  );

// 签到成功分享海报
saasMinaRouter
  .get("/signin/tpl", (req, res) => {
    res.render("saas-mina/signin");
  })
  .get(
    "/signin",
    verifyFields([
      "signin_bg",
      "shop_logo",
      "shop_name",
      "signin_number",
      "course_name",
      "course_time",
      "course_level",
      "qrcode",
    ]),
    renderScreenshot()
  )
  .post(
    "/signin",
    verifyFields([
      "signin_bg",
      "shop_logo",
      "shop_name",
      "signin_number",
      "course_name",
      "course_time",
      "course_level",
      "qrcode",
    ]),
    base64ToImage(),
    renderScreenshot()
  );

// 教练分享海报
saasMinaRouter
  .get("/coach/tpl", (req, res) => {
    res.render("saas-mina/coach");
  })
  .get(
    "/coach",
    verifyFields([
      "coach_bg",
      "shop_logo",
      "shop_name",
      "coach_avatar",
      "coach_name",
      "coach_level",
      "teached_number",
      "qrcode",
    ]),
    renderScreenshot()
  )
  .post(
    "/coach",
    verifyFields([
      "coach_bg",
      "shop_logo",
      "shop_name",
      "coach_avatar",
      "coach_name",
      "coach_level",
      "teached_number",
      "qrcode",
    ]),
    base64ToImage(),
    renderScreenshot()
  );
// 大转盘分享海报
saasMinaRouter
  .get("/turntable/tpl", (req, res) => {
    res.render("saas-mina/turntable");
  })
  .get(
    "/turntable",
    verifyFields(["turntable_bg", "title"]),
    renderScreenshot()
  )
  .post(
    "/turntable",
    verifyFields(["turntable_bg", "title"]),
    base64ToImage(),
    renderScreenshot()
  );
// 活动分享
saasMinaRouter
  .get("/activity/tpl", (req, res) => {
    res.render("saas-mina/activity");
  })
  .get(
    "/activity",
    verifyFields([
      "activity_img",
      "activity_name",
      "activity_time",
      "activity_address",
      "activity_logo",
      "activity_shopname",
      "activity_qrcode",
    ]),
    renderScreenshot()
  )
  .post(
    "/activity",
    verifyFields([
      "activity_img",
      "activity_name",
      "activity_time",
      "activity_address",
      "activity_logo",
      "activity_shopname",
      "activity_qrcode",
    ]),
    base64ToImage(),
    renderScreenshot()
  );
// 跑步机有氧数据海报分享
const verifyFieldsArr = [
  "avatar",
  "nickname",
  "address",
  "length",
  "duration",
  "distance",
  "kcal",
  "speed",
  "completionDegree",
  "codeUrl",
  "chartUrl",
  "mpName",
];
saasMinaRouter
  .get("/treadmill/tpl", (req, res) => {
    res.render("saas-mina/treadmill");
  })
  .get("/treadmill_no_progress_run/tpl", (req, res) => {
    res.render("saas-mina/treadmill");
  })
  .get("/treadmill_no_progress_map/tpl", (req, res) => {
    res.render("saas-mina/treadmill");
  })
  .get(
    "/treadmill",
    verifyFields(verifyFieldsArr),
    renderScreenshot({
      vw: 750,
      vh: 1720,
    })
  )
  .post(
    "/treadmill",
    verifyFields(verifyFieldsArr),
    base64ToImage(),
    renderScreenshot({
      vw: 750,
      vh: 1720,
    })
  )
  .get(
    "/treadmill_no_progress_run",
    verifyFields(verifyFieldsArr),
    renderScreenshot({
      vw: 750,
      vh: 1530,
    })
  )
  .post(
    "/treadmill_no_progress_run",
    verifyFields(verifyFieldsArr),
    base64ToImage(),
    renderScreenshot({
      vw: 750,
      vh: 1530,
    })
  )
  .get(
    "/treadmill_no_progress_map",
    verifyFields(verifyFieldsArr),
    renderScreenshot({
      vw: 750,
      vh: 1800,
    })
  )
  .post(
    "/treadmill_no_progress_map",
    verifyFields(verifyFieldsArr),
    base64ToImage(),
    renderScreenshot({
      vw: 750,
      vh: 1800,
    })
  );

// 拼团海报
saasMinaRouter
  .get("/groupbuy/tpl", (req, res) => {
    res.render("saas-mina/groupbuy");
  })
  .get(
    "/groupbuy",
    verifyFields([
      "name",
      "logo",
      "image",
      "person_num",
      "price",
      "brand_name",
      "qrcode_url",
    ]),
    renderScreenshot({
      vw: 750,
      vh: 1280,
    })
  )
  .post(
    "/groupbuy",
    verifyFields([
      "name",
      "logo",
      "image",
      "person_num",
      "price",
      "brand_name",
      "qrcode_url",
    ]),
    base64ToImage(),
    renderScreenshot({
      vw: 750,
      vh: 1280,
    })
  )
  .get("/physicaltest/tpl", (req, res) => {
    res.render("saas-mina/physicaltest");
  })
  .post(
    "/physicaltest",
    jsonParser,
    verifyFields([
      "avatar",
      "nickname",
      "current_date",
      "differ_days",
      "description",
      "logo",
      "shop_name",
      "qrcode",
      "indicators",
    ]),
    base64ToImage(),
    renderScreenshot({
      vw: 750,
      vh: 950,
      quality: 95,
    })
  );
// 平台化小程序二维码
saasMinaRouter
  .get("/platform/mina-qrcode/tpl", (req, res) => {
    res.render("saas-mina/platform/mina-qrcode");
  })
  .get(
    "/platform/mina-qrcode",
    verifyFields(["brand_logo", "qrcode_url"]),
    renderScreenshot({
      vw: 440,
      vh: 440,
    })
  )
  .post(
    "/platform/mina-qrcode",
    verifyFields(["brand_logo", "qrcode_url"]),
    base64ToImage(),
    renderScreenshot({
      vw: 440,
      vh: 440,
    })
  );

module.exports = saasMinaRouter;
