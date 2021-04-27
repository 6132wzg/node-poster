import Render from '../plugins/render'

const els = [
  // 海报背景
  {
    el: document.querySelector(`.poster-reserve__bg`),
    field: 'course_img',
    update(el, value) {
      el.style.backgroundImage=`url(${value})`
    },
    isResource: true
  },
  // 课程图片
  {
    el: document.querySelector(`.poster-reserve__course-img`),
    field: 'course_img',
    update(el, value) {
      // el.src = value
      el.style.backgroundImage=`url(${value})`
    },
    isResource: true
  },
  // logo
  {
    el: document.querySelector(`.brand__logo`),
    field: 'shop_logo',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  },
  // 小程序码
  {
    el: document.querySelector(`.qrcode-content__qrcode img`),
    field: 'qrcode',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  },
  // 门店名称
  {
    el: document.querySelector(`.brand__name`),
    field: 'shop_name',
    update(el, value) {
      el.textContent = value
    }
  },
  // 课程名称
  {
    el: document.querySelector(`.poster-reserve__course-name span`),
    field: 'course_name',
    update(el, value) {
      el.textContent = value
    }
  },
  // 课程时间
  {
    el: document.querySelector(`.course-time__text`),
    field: 'course_time',
    update(el, value) {
      el.textContent = value
    }
  },
  // 门店地址
  {
    el: document.querySelector(`.shop-address__text`),
    field: 'shop_address',
    update(el, value) {
      el.textContent = value
    }
  }
]

new Render({
  els
})
