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
   * 是否是女孩
   * 根据性别适配不同的背景
   */
  {
    el: $('.poster'),
    field: 'is_girl',
    update(el, value) {
      if (Number(value) === 1) {
        el.classList.add(`girl`)
      }
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
   * 关键词
   */
  {
    el: $('.keywords__content'),
    field: 'keywords',
    update(el, value) {
      el.textContent = value;
    }
  },
  /**
   * 二维码
   */
  {
    el: $('.qr'),
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
