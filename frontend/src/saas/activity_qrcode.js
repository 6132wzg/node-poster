import Render from '../plugins/render'
const $ = document.querySelector.bind(document)
const els = [
  // 小程序页面名称
  {
    el: $('.activity-qrcode__title'),
    field: 'title',
    update(el, value) {
      el.textContent = value
    }
  },
  // 子名称
  {
    el: $('.activity-qrcode__sub-title'),
    field: 'sub_title',
    update(el, value) {
      el.textContent = value
    }
  },
  // 员工名称
  {
    el: $('.activity-qrcode__name'),
    field: 'name',
    update(el, value) {
      el.textContent = value
    }
  },
  // 二维码图片
  {
    el: $('.activity-qrcode__qrcode'),
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
