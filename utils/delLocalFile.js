const fs = require('fs')

//删除本地缓存图片
exports.delLocalFile = function(allPath) {
  return new Promise((resolve, reject) => {
    if(!allPath) {
      resolve();
      return
    }
    if(typeof allPath == 'string') {
      fs.unlinkSync(path);
    } else {
      allPath.forEach((path) => {
        if(path) fs.unlinkSync(path);
      })
    }
    resolve();
  });
}
