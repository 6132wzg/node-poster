import Render from '../plugins/render'
const $ = document.querySelector.bind(document)
const els = [
  {
    el: $('#app'),
    field: 'theme',
    update(el, value) {
      el.classList.add(`card-box--${value}`)
    }
  },
  // 教练头像
  {
    el: $('.user__avatar'),
    field: 'avatar',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  },
  // 教练名称
  {
    el: $('.user__name'),
    field: 'name',
    update(el, value) {
      el.textContent = value
    }
  },
  // 一句话描述
  {
    el: $('.user__des'),
    field: 'des',
    update(el, value) {
      el.textContent = value
    }
  },
  // 课程图片
  {
    el: $('.course__img'),
    field: 'course_image',
    isResource: true,
    update(el, value) {
      el.style.backgroundImage = `url(${value})`
    }
  },
  // 课程名称
  {
    el: $('.course__name'),
    field: 'course_name',
    update(el, value) {
      el.textContent = value
    }
  },
  // 二维码图片
  {
    el: $('.code__img'),
    isResource: true,
    field: 'code_image',
    update(el, value) {
      el.src = value
    }
  }
]

new Render({
  els
})
