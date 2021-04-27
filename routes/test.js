const express = require('express')
const auth = require('../middlewares/auth')
const verifyFields = require('../middlewares/verify-fields')
const renderScreenshot = require('../middlewares/render-screenshot')
const base64ToImage = require('../middlewares/base64-to-image')
const sourceStorage = require('../middlewares/source-storage')
const drawImage = require('../middlewares/draw')
const Poster = require('node-poster-browser')
const GmPoster = require('node-poster-gm')

let gmPoster = new GmPoster({
  CACHE_DIR: './cache2'
})
const minaRouter = express.Router()
async function delayAsync (time) {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve();
      }, time);
  });
}

let poster
async function getPoster() {
	if(!poster) {
		poster = await Poster({
      CACHE_DIR: './cache2/',
      cache: false
    })
	}
	return poster
}

let i = 0
minaRouter
  .get('/index/tpl', (req, res) => {
    res.render('test')
  })
  .get(
    '/index',
    // auth,
    // verifyFields([]),
    // sourceStorage(),
    renderScreenshot()
  )
  .post(
    '/index',
    // auth,
    verifyFields([]),
    base64ToImage(),
    // sourceStorage(),
    renderScreenshot()
  )
  .post(
    '/draw',
    // auth,
    // verifyFields([]),
    drawImage(),
  )
  .get('/poster', async function(req, res, next) {
    console.log(`------- start -------`);
    const reqQuery = req.method === 'GET' ? Object.assign({}, req.query) : Object.assign({}, req.body)
    let url = ''
    // http://localhost:3070/test/index/tpl https://www.baidu.com
    const poster = await getPoster()
    const result = await poster.createPoster({ url: 'http://localhost:3070/test/index/tpl', query: reqQuery}).catch(err => {
      console.log('海报绘制失败')
    })
    const { posterBuffer, ...data } = result
    console.log('海报绘制结果：', data)
    console.log(`------- end -------`);
    res.jsonp(data);
    // next()
  })
  .get('/gm', async function(req, res, next) {
    console.log(`------- start -------`);
    const reqQuery = req.method === 'GET' ? Object.assign({}, req.query) : Object.assign({}, req.body)
    let url = ''
    // http://localhost:3070/test/index/tpl https://www.baidu.com
    url = await gmPoster.createPoster(JSON.parse(JSON.stringify(gmPoster.exampleOpts))).catch(err => {
      console.log('海报绘制失败')
    })
    console.log('海报绘制地址：', url)
    console.log(`------- end -------`);
    res.jsonp({a: 'sleep'});
    // next()
  })
  .get('/test2', function(req, res) {
    console.log(`[${Date.now()}] -> asyncHandler()`);
    async function delayAsync (time) {
      await new Promise(resolve => {
          setTimeout(() => {
              resolve();
          }, time);
      });
      console.log(`[${Date.now()}] -> after sleep`);
      res.jsonp({a: 'sleep'});
    }
    delayAsync(3000)
  })


module.exports = minaRouter
