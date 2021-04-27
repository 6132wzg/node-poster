import Render from '../plugins/render'

const els = [
  // 海报背景
  {
    el: document.querySelector(`.poster-coach__bg`),
    field: 'coach_bg',
    isResource: true,
    resourceAttr: el => {
      return el.src
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
    el: document.querySelector(`.poster-coach__qrcode`),
    field: 'qrcode',
    update(el, value) {
      el.src = value
    },
    isResource: true
  },
  // 门店名称
  {
    el: document.querySelector(`.logo-name__name`),
    field: 'shop_name',
    update(el, value) {
      el.textContent = value
    }
  },
  // 教练头像
  {
    el: document.querySelector(`.info__avatar`),
    field: 'coach_avatar',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  },
  // 教练名字
  {
    el: document.querySelector(`.info__coach-name`),
    field: 'coach_name',
    update(el, value) {
      el.textContent = value
    }
  },
  // 教练等级
  {
    el: document.querySelector(`.info__coach-level`),
    field: 'coach_level',
    update(el, value) {
      el.textContent = value
    }
  },
  // 已授节数
  {
    el: document.querySelector(`.info__coach-number`),
    field: 'teached_number',
    update(el, value) {
      el.textContent = value
    }
  },
  // 课程标签
  {
    el: document.querySelector(`.info__coach-feature`),
    field: 'coach_tag',
    update(el, tags) {
      if (Array.isArray(tags)) {
        tags.forEach(tag => {
          el.innerHTML += `<li class="feature__item">${tag}</li>`
        })
      }
    }
  }
]

new Render({
  els
})
