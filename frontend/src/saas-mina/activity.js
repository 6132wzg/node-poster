import Render from "../plugins/render";

const els = [
  //活动图片
  {
    el: document.querySelector(`.poster-activity-card__img`),
    field: "activity_img",
    isResource: true,
    update(el, value) {
      el.src = value;
    }
  },
  // 活动名称
  {
    el: document.querySelector(`.poster-activity-card__name`),
    field: "activity_name",
    update(el, value) {
      el.textContent = value;
    }
  },
  // 活动时间
  {
    el: document.querySelector(`.poster-activity-card__text`),
    field: "activity_time",
    update(el, value) {
      el.textContent = value;
    }
  },
  // 活动地址
  {
    el: document.querySelector(`.poster-activity-card__address`),
    field: "activity_address",
    update(el, value) {
      el.textContent = value;
    }
  },
  // 门店logo
  {
    el: document.querySelector(`.poster-activity-bottom__logo`),
    field: "activity_logo",
    isResource: true,
    update(el, value) {
      el.src = value;
    }
  },
  // 门店名称
  {
    el: document.querySelector(`.poster-activity-bottom__shopname`),
    field: "activity_shopname",
    update(el, value) {
      el.textContent = value;
    }
  },
  // 二维码
  {
    el: document.querySelector(`.poster-activity-bottom__qrcode`),
    field: "activity_qrcode",
    isResource: true,
    update(el, value) {
      el.src = value;
    }
  }
];

new Render({
  els
});
