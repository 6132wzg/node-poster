
var http = require('http')
var https = require('https')
const config = require('../config')
const Path = require('path')
const Fse = require('fs-extra')
const objectHash = require('object-hash')
const moment = require('moment')
const TEMP_DIR = './temp'
const TEMP_URL = 'temp'

const resolvePath = (baseUrl, hash, fileExt = '') => {
    // 优化temp命名规则
    baseUrl = baseUrl.replace(/^\//, '')
    let dir = `${TEMP_DIR}/storage/${baseUrl}/${moment().format('YYYY-MM-DD')}`
    Fse.ensureDir(dir)
    let path
    path = Path.resolve(`${dir}/${hash}${fileExt}`)
    return path
  }
  const resolveUrl = (baseUrl, hash, fileExt = '') => {
    baseUrl = baseUrl.replace(/^\//, '')
    return `${TEMP_URL}/storage/${baseUrl}/${moment().format('YYYY-MM-DD')}/${hash}${fileExt}`
  }
// 图片资源缓存中间键
async function sourceStorage (req) {
    let query = req.method === 'GET' ? req.query : req.body
    let taskList = []
    try {
        console.log('json', query.json)
        if(query.json) {
            let jsonQuery = {}
            try {
              jsonQuery = JSON.parse(query.json) || {}
            } catch (error) {
              console.log('query parse', error)
            }
            query = Object.assign(query, jsonQuery)
        }
        // console.log('query', query)
        for (key in query) {
            let url = ''
            let urlReg = /(http|https):\/\/([\w.]+\/?)\S*/
            if(query[key] && ( typeof query[key] == 'object')) {
                url = query[key].src || query[key].link
            } else {
                url = query[key] || ''
            }
            
            if (urlReg.test(url)) {
                taskList.push(isExistSource({url, req, query, key}))
                // let hash = ''
                // let cacheUrl = ''
                // let isSave = false
                // let fileExt = ''
                // let filePath = ''
                // hash = objectHash({ url })
                // fileExt = Path.extname(url).split('?')[0]
                // filePath = resolvePath(req.baseUrl, hash, fileExt)
                // cacheUrl = `/${resolveUrl(req.baseUrl, hash, fileExt)}`
                // isSave = await isExistSource(url, filePath)
                // if (isSave && query[key] && ( typeof query[key] == 'object')) {
                //     query[key].src && (query[key].src = cache)
                //     query[key].link && (query[key].link = cache)
                // } else {
                //     query[key] = cacheUrl
                // }
            }
        }
        let queryArr = await Promise.all(taskList)
        console.log('queryArr', queryArr)
        req.method === 'GET' ? req.query = query : req.body = query
    } catch (error) {
        console.log('sourceStorage', error)        
    }
    console.log(query)
    return query
    next()
}

async function isExistSource({url, req, query, key}) {
    let isSave = false
    let hash = objectHash({ url })
    let fileExt = Path.extname(url).split('?')[0]
    let filePath = resolvePath(req.baseUrl, hash, fileExt)
    let cacheUrl = `/${resolveUrl(req.baseUrl, hash, fileExt)}`

    let exist = await Fse.exists(filePath)
    let diffSeconds = -1
    if (exist) {
        const imgFileStat = await Fse.stat(filePath)
        const imgFileMtime = moment(imgFileStat.mtime)
        diffSeconds = moment().diff(imgFileMtime, 'seconds')
    } 
    // config.cache && 
    if (!exist || diffSeconds > config.ttl) {
        exist = await saveImage(url, filePath)
    }
    if (exist) {
        if (query[key] && ( typeof query[key] == 'object')) {
            query[key].src && (query[key].src = cacheUrl)
            query[key].link && (query[key].link = cacheUrl)
        } else {
            query[key] = cacheUrl
        }
    }
    return query
    // console.log(filePath, 'has saved', res)
    // return res
    // return false
}

function saveImage(url, path) {
    console.log('storage source url:', url)
    return new Promise((resolve, reject) => {
        https.get(url,function (req, res) {
            var imgData = '';
            console.log('storage source to local status:', req.statusCode);
            req.on('data',function (chunk) {
                imgData += chunk;
            })
            req.setEncoding('binary');
            req.on('end',function () {
                Fse.writeFile(path,imgData,'binary',function (err) {
                    if(!err) {
                        console.log('保存图片成功'+path)
                        resolve(true)
                    } else {
                        reject(false)
                    }
                })
            })
            req.on("error", function(error) {
                console.log('storage source to local error:', error.message);
            });
        })
    })
}

module.exports = sourceStorage
