import Render from '../plugins/render'

const els = [
  // 海报背景
  {
    el: document.querySelector(`.poster-reserve__bg`),
    field: 'reserve_bg',
    update(el, value) {
      el.classList.add(`poster-reserve__bg--${value}`)
    },
    isResource: true,
    resourceAttr(el) {
      const cStyle = getComputedStyle(el)
      const url = cStyle.backgroundImage.replace(
        /url\(['"]?([^'"\(\)]+)['"]?\)/g,
        '$1'
      )
      return url
    }
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
  }
]

new Render({
  els
})
