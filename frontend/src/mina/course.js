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
  // 品牌图片
  {
    el: $('.brand__img'),
    field: 'brand_logo',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  },
  // 品牌名称
  {
    el: $('.brand__name'),
    field: 'brand_name',
    update(el, value) {
      el.textContent = value
    }
  },
  // 门店名称
  {
    el: $('.brand__shop'),
    field: 'shop_name',
    update(el, value) {
      el.textContent = value
    }
  },
  // 门店描述
  {
    el: $('.brand__text'),
    field: 'shop_desc',
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
  // 课程参加人数
  {
    el: $('.course__count'),
    field: 'course_count',
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
