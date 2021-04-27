import Render from "../plugins/render";
const $ = document.querySelector.bind(document);
const els = [
  // 品牌名称
  {
    el: $(".brand-name"),
    field: "brand_name",
    update(el, value) {
      el.textContent = value;
    }
  },
  // 活动图片
  {
    el: $(".activity-img"),
    isResource: true,
    field: "activity_img",
    update(el, value) {
      console.log(value)
      el.src = value;
    }
  },
  // 活动标题
  {
    el: $(".section__title"),
    field: "activity_title",
    update(el, value) {
      el.textContent = value;
    }
  },
  // 活动时间
  {
    el: $(".time__span"),
    field: "activity_date",
    update(el, value) {
      el.textContent = value;
    }
  },
  // 活动地点
  {
    el: $(".address__span"),
    field: "activity_address",
    update(el, value) {
      el.textContent = value;
    }
  },
  // 二维码图片
  {
    el: $(".qrcode_url"),
    isResource: true,
    field: "qrcode_url",
    update(el, value) {
      el.src = value;
    }
  },
  {
    el: $(".brand-logo"),
    isResource: true,
    field: "brand_logo",
    update(el, value) {
      el.src = value;
    }
  }
];

new Render({
  els
});
