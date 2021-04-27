import Render from '../plugins/render'

const els = [
  // 海报背景
  {
    el: document.querySelector(`.poster-signin__bg`),
    field: 'signin_bg',
    update(el, value) {
      el.classList.add(`poster-signin__bg--${value}`)
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
    el: document.querySelector(`.logo-name__logo`),
    field: 'shop_logo',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  },
  // 小程序码
  {
    el: document.querySelector(`.qrcode-content__qrcode-img`),
    field: 'qrcode',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  },
  // 门店名称
  {
    el: document.querySelector(`.logo-name__name`),
    field: 'shop_name',
    update(el, value) {
      el.textContent = value
    }
  },
  // 签到次数
  {
    el: document.querySelector(`.poster-signin__number`),
    field: 'signin_number',
    update(el, value) {
      el.textContent = value
    }
  },
  // 课程名称
  {
    el: document.querySelector(`.content__title`),
    field: 'course_name',
    update(el, value) {
      el.textContent = value
    }
  },
  // 课程时间
  {
    el: document.querySelector(`.item-time`),
    field: 'course_time',
    update(el, value) {
      el.innerHTML = `${value}<i class="unit font-number">min</i>`
    }
  },
  // 课程等级
  {
    el: document.querySelector(`.item-level`),
    field: 'course_level',
    update(el, value) {
      el.textContent = value
    }
  },
  // 课程是否是团课，1为是，0为不是
  {
    el: document.querySelector(`.content__team`),
    field: 'course_is_team',
    update(el, value) {
      if(!+value){
        el.classList.add('content__team--hide')
      }
    }
  },
  // 课程标签
  {
    el: document.querySelector(`.item-tag`),
    field: 'course_tag',
    update(el, value) {
      el.textContent = value
    }
  }
]

new Render({
  els
})
