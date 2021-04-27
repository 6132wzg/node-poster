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
    el: $('.member__img'),
    field: 'member_avatar',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  },
  {
    el: $('.member__name'),
    field: 'member_name',
    update(el, val) {
      el.textContent = val
    }
  },
  {
    el: $('.shop-name'),
    field: 'shop_name',
    update(el, val) {
      el.textContent = val
    }
  },
  {
    el: $('.course__img'),
    field: 'course_image',
    isResource: true,
    update(el, val) {
      el.style.backgroundImage = `url(${val})`
    }
  },
  {
    el: $('.course__name'),
    field: 'course_name',
    update(el, val) {
      el.textContent = val
    }
  },
  {
    el: $('.course__brand-img'),
    field: 'brand_logo',
    isResource: true,
    update(el, val) {
      el.src = val
    }
  },
  {
    el: $('.course__brand-name'),
    field: 'brand_name',
    update(el, val) {
      el.textContent = val
    }
  },
  {
    el: $('.code__img'),
    field: 'code_image',
    isResource: true,
    update(el, val) {
      el.src = val
    }
  }
]

new Render({
  els
})
