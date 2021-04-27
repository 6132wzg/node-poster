import Render from '../../plugins/render'
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
