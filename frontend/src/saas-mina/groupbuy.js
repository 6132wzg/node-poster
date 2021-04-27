import Render from '../plugins/render'

const els = [
  // 海报背景
  {
    el: document.querySelector(`.course-title`),
    field: 'name',
    isResource: false,
    update(el, value) {
      el.textContent = value
    }
  },
  {
    el: document.querySelector(`.info-logo__img`),
    field: 'logo',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  },
  {
    el: document.querySelector(`.box__img`),
    field: 'image',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  },
  {
    el: document.querySelector(`.group-label__num`),
    field: 'person_num',
    isResource: false,
    update(el, value) {
      el.textContent = value + '人拼'
    }
  },
  {
    el: document.querySelector(`.money__num`),
    field: 'price',
    isResource: false,
    update(el, value) {
      el.textContent = value
    }
  },
  {
    el: document.querySelector(`.info-logo__title`),
    field: 'brand_name',
    isResource: false,
    update(el, value) {
      el.textContent = value
    }
  },
  {
    el: document.querySelector(`.qrcode__img`),
    field: 'qrcode_url',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  }
]

new Render({
  els
})