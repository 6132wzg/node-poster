import Render from '../plugins/render'
const $ = document.querySelector.bind(document)
const els = [
  // 用户名称
  {
    el: $('.user_name'),
    field: 'user_name',
    update(el, value) {
      el.textContent = value
    }
  },
  // 用户头像
  {
    el: $('.user_img'),
    isResource: true,
    field: 'user_img',
    update(el, value) {
      el.src = value
    }
  },
  // 商品图片
  {
    el: $('.goods_img'),
    isResource: true,
    field: 'goods_img',
    update(el, value) {
      el.src = value
    }
  },
  // 二维码图片
  {
    el: $('.code_img'),
    isResource: true,
    field: 'code_img',
    update(el, value) {
      el.src = value
    }
  },
  // 商品价格
  {
    el: $('.goods_name'),
    field: 'goods_name',
    update(el, value) {
      el.textContent = value
    }
  },
  // 商品价格
  {
    el: $('.goods_price'),
    field: 'goods_price',
    update(el, value) {
      el.textContent = value
    }
  }
]

new Render({
  els
})
