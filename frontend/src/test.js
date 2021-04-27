import Render from './plugins/render'

const els = [
  {
    el: $('.viewport'),
    field: 'vw',
    update(el, val) {
      el.content = val
    }
  },
  {
    el: $('#app'),
    field: 'vw',
    refField: ['vw','vh'],
    update(el, val, obj) {
      el.style.width = `${obj.vw}px`
      el.style.height = `${obj.vh}px`
    }
  },
  {
    el: $('.background'),
    field: 'imageUrl',
    refField: ['vw','vh'],
    isResource: true,
    update(el, val, obj) {
      el.style.width = `${obj.vw}px`
      el.style.height = `${obj.vh}px`
      el.src = val
    }
  },
  {
    el: $('.qrcode'),
    field: 'qrCodeUrl',
    refField: ['point1X','point1Y','point2X','point2Y'],
    update(el, val, obj) {
    //   el.style.backgroundImage = `url(${val})`
      const w = obj.point2X - obj.point1X
      const h = obj.point2Y - obj.point1Y
      el.style.width = `${w}px`
      el.style.height = `${h}px`
      el.src = val
      
      el.style.top = `${obj.point1Y}px`
      el.style.left = `${obj.point1X}px`
    }
  },
  {
    el: $('.user_logo'),
    field: 'userLogo',
    refField: ['point1X','point1Y','point2X','point2Y'],
    update(el, val) {
      el.src = val
      el.textContent = val
    }
  },
  {
    el: $('.user_name'),
    field: 'userName',
    refField: ['point1X','point1Y','point2X','point2Y'],
    update(el, val) {
      el.textContent = val
    }
  },
//   {
//     el: $('.course__img'),
//     field: 'course_image',
//     isResource: true,
//     update(el, val) {
//       el.style.backgroundImage = `url(${val})`
//     }
//   },
  
]

new Render({
  els
})
