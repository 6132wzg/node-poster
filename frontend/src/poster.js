import Render from './plugins/render'

const $ = document.querySelector.bind(document)
const els = [
  {
    el: $('.viewport'),
    field: 'viewport'
  },
  {
    el: $('#app'),
    field: 'poster'
  },
  {
    el: '',
    field: 'background'
  },
  {
    el: '',
    field: 'qrCode'
  },
  {
    el: '',
    field: 'userLogo'
  },
  {
    el: '',
    field: 'userName'
  }
]

new Render({
  els
})

// const data = {
//     viewport: {
//         content: 'width=1125'
//     },
//     poster: {
//         style: {
//             width: '1125px',
//             height: '2459px'
//         }
//     },
//     background: {
//         tagName: 'img',
//         src: 'https://x-wxrobot.oss-cn-shanghai.aliyuncs.com/imagetest/H5-product-1.jpg',
//         style: {
//             width: '1125px',
//             height: '2459px'
//         }
//     },
//     qrCode: {
//         tagName: 'img',
//         src: 'https://x-wxrobot.oss-cn-shanghai.aliyuncs.com/onlineimg/app-logo.png',
//         style: {
//             position: 'absolute',
//             left: '33px',
//             top: '2181px',
//             width: '220px',
//             height: '220px'
//         }
//     },
//     userLogo: {
//         tagName: 'img',
//         src: 'https://x-wxrobot.oss-cn-shanghai.aliyuncs.com/onlineimg/app-logo.png',
//         style: {
//             position: 'absolute',
//             top: '220px',
//             left: '20px',
//             width: '220px',
//             height: '220px'
//         }
//     },
//     userName: {
//         tagName: 'div',
//         textContent: '这是昵称！！！',
//         style: {
//             position: 'absolute',
//             top: '330px',
//             left: '260px',
//             color: 'red'
//         }
//     }
// }