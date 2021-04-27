const request = require('request');
const fs = require('fs')
const { logger } = require('../config/log.config');

exports.saveImg = function (src) {
  return new Promise((resolve, reject) => {
    if(!src) {
      resolve();
      return
    }
    try {
      request.get({url: src, encoding: 'binary'}, (err, response, body) => {
        if(!err && response.statusCode === 200) {
          let imageSrc = `./../cache/${Math.random().toString(36).substr(3,8)}.png`;
          fs.writeFile(imageSrc, body, 'binary', (err) => {
            if(!err) {
              console.log('>>>>>>>> saveImage', src, ' as ', imageSrc);
              resolve(imageSrc);
            } else {
              console.log('>>>>>>>> saveImageFail <<<<<<');
              logger.error(src + '图片缓存失败', err);
              resolve();
            }
          })
        } else {
          console.log('>>>>>>>> requestImageFail '+src+' <<<<<<');
          logger.error(src + '图片获取失败', err);
          resolve();
        }
      })
    } catch (e) {
      console.log('>>>>>>>> requestImageFail '+ src);
      logger.error(src + '图片获取失败', err);
      resolve();
    } finally {

    }

  });
}
