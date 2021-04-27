import Render from '../plugins/render'
const $ = document.querySelector.bind(document)
const els = [
  // 品牌logo
  {
    el: $('.brand_logo'),
    field: 'brand_logo',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  },
  // 品牌名称
  {
    el: $('.brand_name'),
    field: 'brand_name',
    update(el, value) {
      el.textContent = value
    }
  },
  // 价钱
  {
    el: $('.price'),
    field: 'price',
    update(el, value) {
      el.textContent = value
    }
  },
  // 二维码图片
  {
    el: $('.qrcode_url'),
    isResource: true,
    field: 'qrcode_url',
    update(el, value) {
      el.src = value
    }
  }
]

new Render({
  els
})
