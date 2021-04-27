const config = require('../config')
const _ = require('lodash')
const puppeteer = require('puppeteer')
// 必须使用浏览器端的qs实现 编解码 数组等和node不同
const qs = require('qs')
const Path = require('path')
const Fse = require('fs-extra')
const objectHash = require('object-hash')
const moment = require('moment')
const TEMP_DIR = './temp'
const TEMP_URL = 'temp'
const os = require('os')
const RESOURCE_DIR = './public/resource'
const sourceStorage = require('./source-storage')
// bootstrap to clean TEMP_DIR
Fse.emptyDir(TEMP_DIR)
Fse.emptyDir(RESOURCE_DIR)

var colors = require('colors');
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'red',
  info: 'green',
  data: 'blue',
  help: 'cyan',
  warn: 'yellow',
  debug: 'magenta',
  error: 'red'
})
/**
 * https://peter.sh/experiments/chromium-command-line-switches
 */
const MAX_WSE = 2;  //启动几个浏览器
let WSE_LIST = []; //存储browserWSEndpoint列表
const launchArgs = [
  '--disable-gpu',
  '--disable-webgl',
  '--disable-dev-shm-usage',
  '--disable-setuid-sandbox',
  '--disable-extensions',
  '--disable-java',

  '--no-experiments',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-sandbox',
  '--no-zygote',
  '–-single-process'
]
// fix windows bug
// if (os.platform() !== 'win32') {
//   launchArgs.push('--single-process')
// }
function init() {
  (async () => {
    for (var i = 0; i < MAX_WSE; i++) {
      const browser = await puppeteer.launch({
        headless: true,
        args: launchArgs
      });
      const browserWSEndpoint = await browser.wsEndpoint();
      WSE_LIST[i] = browserWSEndpoint;
    }
    console.log('当前实例打开的浏览器个数：'.verbose, WSE_LIST.length);
  })();
}
init()


// make browser always ready
// let browser
// puppeteer
//   .launch({
//     headless: true,
//     args: launchArgs
//   })
//   .then(myBrowser => {
//     browser = myBrowser
//   })
//   .catch(err => {
//     console.error(err)
//   })

const resolvePath = (baseUrl, hash) => {
  // 优化temp命名规则
  baseUrl = baseUrl.replace(/^\//, '')
  let dir = `${TEMP_DIR}/${baseUrl}/${moment().format('YYYY-MM-DD')}`
  Fse.ensureDir(dir)
  let path
  path = Path.resolve(`${dir}/${hash}.jpg`)
  return path
}
const resolveUrl = (baseUrl, hash) => {
  baseUrl = baseUrl.replace(/^\//, '')
  return `${TEMP_URL}/${baseUrl}/${moment().format('YYYY-MM-DD')}/${hash}.jpg`
}
module.exports = ({ vw = 750, vh = 1334, quality = 80 } = {}) =>  async (
  req,
  res,
  next
) => {
  // 处理时间记录
  const dealTime = moment().valueOf()
  // const reqQuery = await sourceStorage(req)
  // console.log(reqQuery)
  const reqQuery = req.method === 'GET' ? Object.assign({}, req.query) : Object.assign({}, req.body)
  vw = +reqQuery.vw || vw
  vh = +reqQuery.vh || vh
  // token 不进入hash计算
  if ('token' in reqQuery) {
    delete reqQuery['token']
  }
  if ('download' in reqQuery) {
    delete reqQuery['download']
  }

  let url = ''
  let reqQueryString = qs.stringify(reqQuery)
  // hotfix 紧急修复会员体测二维码不能正常展示的问题
  // if (req.path.indexOf('physicaltest')) {
  //   reqQuery['isSaveFile'] = 1
  // }
  // 如果数据过多采用保存文件的方式，判断是否是要按照保存文件方式，如果是写入文件
  if (+reqQuery.isSaveFile) {
    // 根据参数生成hash，参数不同hash不同
    const fileHash = objectHash({ reqQueryString })
    // 写入json
    const testJsonFile = Path.resolve(`${RESOURCE_DIR}/${fileHash}.json`)
    Fse.ensureFileSync(testJsonFile)
    Fse.writeJsonSync(testJsonFile, reqQuery)
    // URL携带按照文件方式和hash值用于渲染时读取数据
    url = `${config.host}${req.baseUrl + req.path + '/tpl'}?isSaveFile=1&hash=${fileHash}`
  } else {
    url = `${config.host}${req.baseUrl + req.path + '/tpl'}?${qs.stringify(
      reqQuery
    )}`
  }
  const selector = reqQuery.selector
  const waitFor = '#load'
  const hash = objectHash({
    vw,
    vh,
    quality,
    reqQueryString,
    waitFor
  })

  let headers = {}
  if (req.query.download) {
    headers['Content-Type'] = 'application/force-download'
    headers['Content-Disposition'] = `attachment;filename=${req.query
      .download || hash}.jpg`
  }

  async function run() {
    const screenshotPath = resolvePath(req.baseUrl, hash)
    const screenshotUrl = `/${resolveUrl(req.baseUrl, hash)}`
    const exist = await Fse.exists(screenshotPath)
    // resolvePath(req.baseUrl, hash) 图片地址，判断是否有缓存图片
    if (exist && config.cache) {
      const imgFileStat = await Fse.stat(screenshotPath)
      const imgFileMtime = moment(imgFileStat.mtime)
      const diffSeconds = moment().diff(imgFileMtime, 'seconds')
      console.log('cache'.verbose, (moment().valueOf() - dealTime).toString().green)
      if (diffSeconds < config.ttl) {
        if (req.method === 'GET') {
          res.sendFile(screenshotPath, { headers }, err => {
            if (err) {
              throw err
            } else {
              console.log('time'.verbose, (moment().valueOf() - dealTime).toString().green)
              console.log('sent from cache', screenshotPath)
            }
          })
        } else {
          console.log('time'.verbose, (moment().valueOf() - dealTime).toString().green)
          res.json({
            code: 200,
            data: {
              url: screenshotUrl
            }
          })
        }
        return
      }
    }
    let browserWSEndpoint = WSE_LIST[Math.floor(Math.random() * MAX_WSE)];
    const browser = await puppeteer.connect({ browserWSEndpoint })
    const page = await browser.newPage()
    // console.log(('当前浏览器打开的tab页个数：'.verbose, browser.targets()).length)

    await page.setViewport({
      width: vw,
      height: vh
    })
    await page.goto(url)
    await page.waitFor(waitFor)
    // await page.waitForSelector('img')
    if (selector) {
      const rect = await page.evaluate(selector => {
        const element = document.querySelector(selector)
        if (!element) return null
        const { x, y, width, height } = element.getBoundingClientRect()
        return { left: x, top: y, width, height, id: element.id }
      }, selector)
      if (!rect) {
        throw Error(`Could not find element that matches selector: ${selector}.`)
      }
      await page.screenshot({
        path: screenshotPath,
        quality,
        clip: {
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height
        }
      })
    } else {
      await page.screenshot({
        path: screenshotPath,
        quality,
        fullPage: true
      })
    }

    await page.close()

    // await browser.close()
    if (req.method === 'GET') {
      res.sendFile(screenshotPath, { headers }, err => {
        if (err) {
          throw err
        } else {
          console.log('time'.verbose, (moment().valueOf() - dealTime).toString().green)
        }
      })
    } else {
      res.json({
        code: 200,
        data: {
          url: screenshotUrl
        }
      })
    }

  }

  run().catch(err => {
    next(err)
  })
}
