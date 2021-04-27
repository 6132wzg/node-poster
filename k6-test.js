import { check } from 'k6';
import http from 'k6/http';
export let options = {
  vus: 5,
  duration: '30s',
};
export default function () {
    const r = Math.floor(Math.random() * 1000)
    // let res = http.get('http://localhost:3070/test/index\?vw\=1125\&vh\=2459\&imageUrl\=https%3A%2F%2Fx-wxrobot.oss-cn-shanghai.aliyuncs.com%2Fimagetest%2FH5-product-1.jpg\&qrCodeUrl\=https%3A%2F%2Fx-wxrobot.oss-cn-shanghai.aliyuncs.com%2Fonlineimg%2Fapp-logo.png\&point1X\=33\&point1Y\=2181\&point2X\=253\&point2Y\=2401'+'\&r\='+r);
    // let res = http.get('http://localhost:3070/test/poster?a=1&time=');
    // let res = http.get('https://www.baidu.com?a=1&time='+r);
    let res = http.post('http://localhost:3000/api/browser-poster', {
      "html": "test",
      "userName": "this is test load2",
      "waitFor": "#load"
    });
    // let res = http.get('http://localhost:3070/test/poster');
    // let res = http.get('http://localhost:3070/test/gm');
    check(res, {
      'is status 200': (r) => {
        const data = JSON.parse(r.body || '{}')
        return  r.status && data && data.success
      }
    })
}


// const data = {
//     "ossConfig": {
//       "bucket": "cz-dev-static",
//       "endpoint": "oss-cn-shanghai.aliyuncs.com"
//     },
//     "outputPath": "test/test"+ r +".jpeg",
//     "backgroundUrl": "https://x-wxrobot.oss-cn-shanghai.aliyuncs.com/imagetest/H5-product-1.jpg",
//     "width": 750,
//     "height": 1334,
//     "shape": [
//         {
//             "type": "line",
//             "value": [0, 1100, 650, 1100],
//             "strokeWidth": 1,
//             "strokeColor": "#000"
//         },
//         {
//             "type": "bezier",
//             "value": [0, 1100, 300, 900, 100, 900, 500, 900, 600, 1100],
//             "strokeWidth": 1,
//             "strokeColor": "#F00"
//         },
//         {
//             "type": "polyline",
//             "value": [0, 1100,200, 1000, 300, 850, 350, 1050 , 500, 900],
//             "strokeWidth": 1,
//             "strokeColor": "#0f0"
//         },
//         {
//             "type": "rectangle",
//             "value": [10, 300, 210, 510],
//             "background": "#0f0",
//             "strokeWidth": 2,
//             "strokeColor": "#00f"
//         },
//         {
//             "type": "polygon",
//             "value": [500, 300, 650, 300, 700, 400, 500, 500],
//             "strokeWidth": 1,
//             "strokeColor": "#00f"
//         },
//         {
//             "type": "circle",
//             "value": [600, 400, 625, 425],
//             "background": "#0f0",
//             "strokeWidth": 1,
//             "strokeColor": "#00f"
//         },
//         {
//             "type": "line",
//             "value": [600, 400, 625, 425],
//             "strokeWidth": 1,
//             "strokeColor": "#f0f"
//         },
//         {
//             "type": "ellipse",
//             "value": [400, 400, 100, 50, 0, 360],
//             "background": "#0f0",
//             "strokeWidth": 1,
//             "strokeColor": "#00f"
//         },
//         {
//             "type": "arc",
//             "value": [0, 1000, 600, 1200,180,0],
//             "strokeWidth": 1,
//             "strokeColor": "#00f"
//         },
//         {
//             "type": "rectangle",
//             "value": [0, 1000, 600, 1200],
//             "strokeWidth": 1,
//             "strokeColor": "#00f"
//         }
//     ],
//     "qrcode": [{
//       "url": "https://x-wxrobot.oss-cn-shanghai.aliyuncs.com/onlineimg/app-logo.png",
//       "x": 40,
//       "y": 40,
//       "w": 90,
//       "h": 90
//     }],
//     "image": [
//       {
//         "src": "https://x-wxrobot.oss-cn-shanghai.aliyuncs.com/onlineimg/app-logo.png",
//         "x": 150,
//         "y": 150,
//         "w": 200,
//         "h": 200
//       }
//     ],
//     "text": [
//       {
//         "val": "服务端绘图-绘制二维码、图片、文字-位置自定义",
//         "color": "#bd2a3c",
//         "fontSize": "36",
//         "position": "Center",
//         "vertical": "top",
//         "x": 0,
//         "y": 0,
//         "lineLen": 20,
//         "lineHeight": 60,
//         "maxLine": 2,
//         "lineStatus": [
//           {
//             "ratio": 1,
//             "lineLenArr": [1]
//           },
//           {
//             "ratio": 1.6,
//             "lineLenArr": [0.4, 0.6]
//           },
//           {
//             "ratio": 2.6,
//             "lineLenArr": [1, 0.6, 1]
//           }
//         ]
//       },
//       {
//         "val": "West",
//         "fontSize": "36",
//         "position": "West",
//         "vertical": "center",
//         "x": 0,
//         "y": 0
//       },
//       {
//         "val": "NorthWest",
//         "fontSize": "36",
//         "position": "NorthWest",
//         "vertical": "center",
//         "x": 0,
//         "y": 0
//       },
//       {
//         "val": "North",
//         "fontSize": "36",
//         "position": "North",
//         "x": 0,
//         "y": 0
//       },
//       {
//         "val": "NorthEast",
//         "fontSize": "36",
//         "position": "NorthEast",
//         "x": 0,
//         "y": 0
//       },
//       {
//         "val": "East",
//         "fontSize": "36",
//         "position": "East",
//         "x": 0,
//         "y": 0
//       },
//       {
//         "val": "SouthEast",
//         "fontSize": "36",
//         "position": "SouthEast",
//         "x": 0,
//         "y": 0
//       },
//       {
//         "val": "South",
//         "fontSize": "36",
//         "position": "South",
//         "x": 0,
//         "y": 0
//       },
//       {
//         "val": "SouthWest",
//         "fontSize": "36",
//         "position": "SouthWest",
//         "x": 0,
//         "y": 0
//       }
//     ]
// }
// var params = {
//   headers: {
//     'Content-Type': 'application/json',
//   },
// };
