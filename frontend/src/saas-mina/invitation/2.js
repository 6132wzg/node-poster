import Render from '../../plugins/render'

const els = [
  // 海报背景
  { 
    el: document.querySelector(`.poster-invitation-2__bg`),
    field: 'invitation_bg',
    isResource: true,
    update(el, value) {
      // el.src = value
    }
  },
  // 品牌Logo
  { 
    el: document.querySelector(`.poster-invitation-2__brand-logo`),
    field: 'brand_logo',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  },
  // 价格
  { 
    el: document.querySelector(`.poster-invitation-2__value-number`),
    field: 'price',
    update(el, value) {
      el.textContent = value
    }
  },
  // 小程序码
  {
    el: document.querySelector(`.poster-invitation-2__qrcode`),
    field: 'qrcode',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  },
  // 用户name
  {
    el: document.querySelector(`.poster-invitation-2__text-name`),
    field: 'user_name',
    update(el, value) {
      el.textContent = value
    }
  },
]

new Render({
  els
})
