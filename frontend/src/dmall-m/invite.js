import Render from '../plugins/render'
const $ = document.querySelector.bind(document)
const els = [
  // 用户名称
  {
    el: $('.leader_name'),
    field: 'leader_name',
    update(el, value) {
      el.textContent = value
    }
  },
  // 用户头像
  {
    el: $('.leader_avatar'),
    isResource: true,
    field: 'leader_avatar',
    update(el, value) {
      el.src = value
    }
  },
  // 商品图片
  {
    el: $('.bg_img'),
    isResource: true,
    field: 'bg_img',
    update(el, value) {
      el.src = value
    }
  },
  // 二维码图片
  {
    el: $('.poster_code'),
    isResource: true,
    field: 'poster_code',
    update(el, value) {
      el.src = value
    }
  },
  // 商品价格
  {
    el: $('.poster_des'),
    field: 'poster_des',
    update(el, value) {
      el.textContent = value
    }
  }
]

new Render({
  els
})
