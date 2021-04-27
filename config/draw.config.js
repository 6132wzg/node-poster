// 字体默认设置
const FONTFAMILY = './public/font/';
const textOpts = {
  font: '苹方黑体-准-简.ttf',
  fontSize: 30,
  color: '#000000',
  position: 'NorthWest',
  vertical: 'top',
  lineLen: 375,
  maxLine: 3,
  lineHeight: 36,
  x: 0,
  y: 0,
};
// 图片位置默认设置
const imgOpts = {
  x: 0,
  y: 0,
  w: 50,
  h: 50,
};

const shapeArr = ['point','line','bezier','polyline','rectangle','roundRectangle','polygon','arc','circle','ellipse'];

// 示例图配置
const dataOpts = {
  "ossConfig": {
    "bucket": "cz-dev-static",
    "endpoint": "oss-cn-shanghai.aliyuncs.com"
  },
  "outputPath": "test/test.jpeg",
  "backgroundUrl": "https://x-wxrobot.oss-cn-shanghai.aliyuncs.com/imagetest/H5-product-1.jpg",
  "width": 750,
  "height": 1334,
  "shape": [
  	{
	  	"type": "line",
	  	"value": [0, 1100, 650, 1100],
	  	"strokeWidth": 1,
	  	"strokeColor": "#000"
  	},
  	{
	  	"type": "bezier",
	  	"value": [0, 1100, 300, 900, 100, 900, 500, 900, 600, 1100],
	  	"strokeWidth": 1,
	  	"strokeColor": "#F00"
  	},
  	{
	  	"type": "polyline",
	  	"value": [0, 1100,200, 1000, 300, 850, 350, 1050 , 500, 900],
	  	"strokeWidth": 1,
	  	"strokeColor": "#0f0"
  	},
  	{
	  	"type": "rectangle",
	  	"value": [10, 300, 210, 510],
	  	"background": "#0f0",
	  	"strokeWidth": 2,
	  	"strokeColor": "#00f"
  	},
  	{
	  	"type": "polygon",
	  	"value": [500, 300, 650, 300, 700, 400, 500, 500],
	  	"strokeWidth": 1,
	  	"strokeColor": "#00f"
  	},
  	{
	  	"type": "circle",
	  	"value": [600, 400, 625, 425],
	  	"background": "#0f0",
	  	"strokeWidth": 1,
	  	"strokeColor": "#00f"
  	},
  	{
	  	"type": "line",
	  	"value": [600, 400, 625, 425],
	  	"strokeWidth": 1,
	  	"strokeColor": "#f0f"
  	},
  	{
	  	"type": "ellipse",
	  	"value": [400, 400, 100, 50, 0, 360],
	  	"background": "#0f0",
	  	"strokeWidth": 1,
	  	"strokeColor": "#00f"
  	},
  	{
	  	"type": "arc",
	  	"value": [0, 1000, 600, 1200,180,0],
	  	"strokeWidth": 1,
	  	"strokeColor": "#00f"
  	},
  	{
	  	"type": "rectangle",
	  	"value": [0, 1000, 600, 1200],
	  	"strokeWidth": 1,
	  	"strokeColor": "#00f"
  	}
  ],
  "qrcode": [{
    "url": "https://x-wxrobot.oss-cn-shanghai.aliyuncs.com/onlineimg/app-logo.png",
    "x": 40,
    "y": 40,
    "w": 90,
    "h": 90
  }],
  "image": [
    {
      "src": "https://x-wxrobot.oss-cn-shanghai.aliyuncs.com/onlineimg/app-logo.png",
      "x": 150,
      "y": 150,
      "w": 200,
      "h": 200
    }
  ],
  "text": [
    {
      "val": "服务端绘图-绘制二维码、图片、文字-位置自定义",
      "font": "./public/font/苹方黑体-准-简.ttf",
      "color": "#bd2a3c",
      "fontSize": "36",
      "position": "Center",
      "vertical": "top",
      "x": 0,
      "y": 0,
      "lineLen": 20,
      "lineHeight": 60,
      "maxLine": 2,
      "lineStatus": [
        {
          "ratio": 1,
          "lineLenArr": [1]
        },
        {
          "ratio": 1.6,
          "lineLenArr": [0.4, 0.6]
        },
        {
          "ratio": 2.6,
          "lineLenArr": [1, 0.6, 1]
        }
      ]
    },
    {
      "val": "West",
      "fontSize": "36",
      "position": "West",
      "vertical": "center",
      "x": 0,
      "y": 0
    },
    {
      "val": "NorthWest",
      "fontSize": "36",
      "position": "NorthWest",
      "vertical": "center",
      "x": 0,
      "y": 0
    },
    {
      "val": "North",
      "fontSize": "36",
      "position": "North",
      "x": 0,
      "y": 0
    },
    {
      "val": "NorthEast",
      "fontSize": "36",
      "position": "NorthEast",
      "x": 0,
      "y": 0
    },
    {
      "val": "East",
      "fontSize": "36",
      "position": "East",
      "x": 0,
      "y": 0
    },
    {
      "val": "SouthEast",
      "fontSize": "36",
      "position": "SouthEast",
      "x": 0,
      "y": 0
    },
    {
      "val": "South",
      "fontSize": "36",
      "position": "South",
      "x": 0,
      "y": 0
    },
    {
      "val": "SouthWest",
      "fontSize": "36",
      "position": "SouthWest",
      "x": 0,
      "y": 0
    }
  ]
};

// 接口传入参数 功能说明
const dataDescription = {
  desc: '以下为 接口传入参数 功能说明 imageUrl为示例图 opts:示例图配置参数 (示例图和配置参数里的图片资源可能失效, 可参照示例配置更换图片资源生成新的示例图)',
  imageUrl: 'http://cz-dev-static.oss-cn-shanghai.aliyuncs.com/test/test.jpeg',
  ossConfig: {
    bucket: 'String 自定义oss配置 可配置bucket 默认为 cz-dev-content',
    endpoint: 'String 自定义oss配置 oss内网外网配置， 默认为内网 oss-cn-shanghai-internal.aliyuncs.com'
  },
  outputPath: '*String 必填 test/test.jpeg',
  backgroundUrl: '*String 背景图资源链接  必填',
  width: 'Number 非必填  默认为 750',
  height: 'Number 非必填  默认为 1334',
  shape: [
   {
     type: "*String 要绘制的图形，参数为绘制对应图形的方法名（point,line,bezier,polyline,rectangle,roundRectangle,polygon,arc,circle,ellipse） 必填",
     value: "*Array 绘制图形的其他参数，针对不同方法这个参数传入值不同,参数格式参考opts示例 必填",
     background: "String 绘制图形的背景颜色 默认黑色",
     strokeWidth: "Number 图形边框的宽度 默认没有边框 注: 设置为0仍会有边框线，如果不需要边框线请设置为空或不传",
     strokeColor: "String 图形边框的颜色 默认无色"
   }
 ],
  qrcode: [{
    url: '*String 二维码中的url  必填',
    x: 'Number x,y 为 绘制坐标位置 默认为 0',
    y: 'Number 默认为 0',
    w: 'Number w,h 为 如果绘制图片 代表图片大小 如果绘制文本 w 代表绘制最大宽度 h 代表文本行高 默认为 50',
    h: 'Number 默认为 50',
  }],
  image: [
    {
      src: '*String 图片资源链接 必填',
      x: 'Number x,y 为 绘制坐标位置  默认为 0',
      y: 'Number 默认为 0',
      w: 'Number w,h 为 如果绘制图片 代表图片大小 如果绘制文本 w 代表绘制最大宽度 h 代表文本行高 默认为 50',
      h: 'Number 默认为 50',
    },
  ],
  text: [
    {
      val: '*String 文本值  必填',
      font: 'String 字体库 有 苹方黑体-(极细、细、纤细、中粗、中黑、准)-简.ttf 共6种  默认为 苹方黑体-准-简.ttf',
      color: 'String 字体颜色 默认为 #000000',
      fontSize: 'Number 默认为 30',
      position: 'String 相对于坐标字体显示位置 NorthWest, North, NorthEast, East, SouthEast, South, SouthWest, West, Center 默认为 NorthWest (位置排版请参考示例图imageUrl)',
      vertical: 'String 文本绘制类型 默认为 top 自初始位置向下 center 自初始位置向上下延伸  （x,y 为初始位置）默认为 top',
      x: 'Number x,y 为 绘制坐标位置 默认为 0',
      y: 'Number 默认为 0',
      lineLen: 'Number 文本绘制单行最大长度 默认为 375字符',
      lineHeight: 'Number 行高 默认为 36',
      maxLine: 'Number 文本最大绘制行数 默认为 3 文案超出会被做截断处理',
      lineStatus_desc: 'lineStatus注释: 如果该值不存在 则代表 每一行的 绘制长度 都为 单行最大长度lineLen 否则使用以下的显示方案 (lineStatus[0]代表文案为一行时显示格式，lineStatus[1]代表文案为两行时显示格式。。。以此类推) 默认为 空',
      lineStatus: [
        {
          ratio: 'Number 文案为一行时 文本最大总长度为  1倍的lineLen 即 ratio * lineLen',
          lineLenArr: 'Array 如果值为: [1] 第一行为 文本最大总长度的 1倍'
        },
        {
          ratio: 'Number 文案长度为2行时 文本最大总长度为  1.6倍的lineLen',
          lineLenArr: 'Array 数组总和为1 如果值为: [0.4, 0.6] 第一行为 文本最大总长度的 0.4倍，第二行为 文本最大总长度的 0.6倍'
        },
        {
          ratio: 'Number 文案长度为3行时 文本最大总长度为  2.6倍的lineLen',
          lineLenArr: 'Array 如果值为: [0.3, 0.4, 0.3] 第一行为 文本最大总长度的 1倍，第二行为 文本最大总长度的 0.6倍，第三行为 文本最大总长度的 1倍'
        }
      ],
    },
  ],
  opts: dataOpts,
};

module.exports = {
	FONTFAMILY,
  textOpts,
  imgOpts,
  dataDescription,
  shapeArr,
}
