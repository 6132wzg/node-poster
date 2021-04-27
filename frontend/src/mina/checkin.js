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
  {
    el: $('.brand__name'),
    field: 'brand_name',
    update(el, value) {
      el.textContent = value
    }
  },
  {
    el: $('.brand__img'),
    field: 'brand_logo',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  },
  {
    el: $('.congratulate__course-name'),
    field: 'course_name',
    update(el, value) {
      el.textContent = value
    }
  },
  {
    el: $('.code__img'),
    field: 'code_image',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  }
]

new Render({
  els
})
