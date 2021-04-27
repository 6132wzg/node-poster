import Render from '../../plugins/render'

const els = [
  // 海报背景
  { 
    el: document.querySelector(`.poster-invitation-0__bg`),
    field: 'invitation_bg',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  },
  // 小程序码
  {
    el: document.querySelector(`.poster-invitation-0__qrcode`),
    field: 'qrcode',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  },
  // 用户名称
  {
    el: document.querySelector(`.poster-invitation-0__text-name`),
    field: 'user_name',
    update(el, value) {
      el.textContent = value
    }
  },
]

new Render({
  els
})
