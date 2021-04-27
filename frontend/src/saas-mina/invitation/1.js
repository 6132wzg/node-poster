import Render from '../../plugins/render'

const els = [
  // 海报背景
  { 
    el: document.querySelector(`.poster-invitation-1__bg`),
    field: 'invitation_bg',
    isResource: true,
    update(el, value) {
      // el.src = value
    }
  },
  // 用户头像
  { 
    el: document.querySelector(`.poster-invitation-1__avatar`),
    field: 'user_avatar',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  },
  // 用户名称
  {
    el: document.querySelector(`.poster-invitation-1__name`),
    field: 'user_name',
    update(el, value) {
      el.textContent = `${value} 送你`
    }
  },
  // 品牌Logo
  { 
    el: document.querySelector(`.poster-invitation-1__brand-logo`),
    field: 'brand_logo',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  },
  // 价格
  { 
    el: document.querySelector(`.poster-invitation-1__value-number`),
    field: 'price',
    update(el, value) {
      el.textContent = value
    }
  },
  // 优惠券名称
  { 
    el: document.querySelector(`.poster-invitation-1__coupon-name`),
    field: 'coupon_name',
    update(el, value) {
      el.textContent = value
    }
  },
  // 小程序码
  {
    el: document.querySelector(`.poster-invitation-1__qrcode`),
    field: 'qrcode',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  },
  // 用户name
  {
    el: document.querySelector(`.poster-invitation-1__text-name`),
    field: 'user_name',
    update(el, value) {
      el.textContent = value
    }
  },
]

new Render({
  els
})
