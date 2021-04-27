// base64
const fs = require('fs-extra')
const Path = require('path')
const objectHash = require('object-hash')

const reg = /^data\:image\/(\w+)\;base64\,/

const BASE64_DIR = './public/base64'

fs.ensureDir(BASE64_DIR)
fs.emptyDir(BASE64_DIR)

const writeFile = (body,item) => {
  let base64 = body[item]
  let hash = objectHash(base64)
  let file = `${hash}.${reg.exec(base64)[1]}`
  let path = Path.resolve(`${BASE64_DIR}/${file}`)

  return new Promise((resolve,reject) => {
    try{
      if(fs.existsSync(path)) {
        body[item] = `/base64/${file}`
        resolve(path)
        return
      }
      let data = Buffer.from(base64.replace(reg,''),'base64')
      fs.writeFile(path,data,function(err) {
        if(err){
          reject(err)
        }else {
          body[item] = `/base64/${file}`
          resolve(path)
        }
      })
    }catch(err) {
      console.log(err)
      reject(err)
    }
  })
}
const base64ToImage = () => (req, res, next) => {
  let body = req.body
  let keyList = Object.keys(body)
    .filter( item => reg.test(body[item]))
    .map( item => writeFile(body,item))
  Promise.all(keyList)
  .then(() => next())
  .catch(() => next())
}

module.exports = base64ToImage
