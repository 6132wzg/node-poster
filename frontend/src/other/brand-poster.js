import Render from '../plugins/render';
const $ = document.querySelector.bind(document);
const els = [
  /**
   * 主题
   */
  {
    el: $('.poster'),
    field: 'theme',
    update(el, value) {
      el.classList.add(`theme-${value}`)
    }
  },
  /**
   * 品牌logo
   */
  {
    el: $('.poster__logo'),
    isResource: true,
    field: 'brand_logo',
    update(el, value) {
      el.src = value;
    }
  },
  /**
   * 品牌名称
   */
  {
    el: $('.poster__brand-name'),
    field: 'brand_name',
    update(el, value) {
      el.textContent = value;
    }
  },
  /**
   * 二维码
   */
  {
    el: $('.poster__qr'),
    isResource: true,
    field: 'qrcode_url',
    update(el, value) {
      el.src = value;
    }
  }
];

new Render({
  els
});
