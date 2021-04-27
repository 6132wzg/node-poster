import Render from '../plugins/render'
const $ = document.querySelector.bind(document)
const els = [
  
  // 品牌名称
  {
    el: $('.sub_name'),
    field: 'sub_name',
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
