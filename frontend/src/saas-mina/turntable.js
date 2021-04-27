import Render from '../plugins/render'

const els = [
  // 海报背景
  { 
    el: document.querySelector(`.poster-turntable__bg`),
    field: 'turntable_bg',
    isResource: true,
    update(el, value) {
      el.src = value
    }
  },
  // 标题
  {
    el: document.querySelector(`.poster-turntable__title`),
    field: 'title',
    update(el, value) {
      el.textContent = value
    }
  },
]

new Render({
  els
})
