import Render from '../plugins/render'
const $ = document.querySelector.bind(document)
const els = [
  {
    el: document.querySelector(`.content__qrcode`),
    field: "qrcode",
    isResource: true,
    update(el, value) {
      el.src = value;
    }
  }
]

new Render({
  els
})
