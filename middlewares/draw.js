const gm = require('gm').subClass({ imageMagick: true })
const qr = require('qr-image')
const fs = require('fs')
const { logger } = require('../config/log.config');
const { FONTFAMILY, textOpts, imgOpts, dataDescription, shapeArr } = require('../config/draw.config')
const { saveImg, delLocalFile, ensureDir } = require('../utils/index')

module.exports = () => async (req, res, next) => {
  let query = req.body;
  let returnResult = true, errMsg = ''; //最终返回结果
  let allPath = []; //临时图片数组路径
  let pointer;
  console.log('>>>>>>>> draw start');

  if(!query) return sendResult(res, '参数不能为空');

  // 绘制背景
  let backgroundPath = await saveImg(query.backgroundUrl);
  allPath.push(backgroundPath);
  query.backgroundUrl = backgroundPath;
  if(!checkQuery(res, query, 'background')) {
    //删除本地缓存图片
    await delLocalFile(allPath);
    return
  };
  await new Promise((resolve, reject) => {
    console.log('>>>>>>>> draw background', backgroundPath);
    pointer = gm(backgroundPath).resize((query.width || 750), (query.height || 1334), '!');
    resolve();
  })

  // 绘制图形
  if(query.shape && query.shape.length) {
    for(let s = 0, l = query.shape.length; s < l; s++) {
      if(!checkQuery(res, query.shape[s], 'shape', s)){
        //删除本地缓存图片
        await delLocalFile(allPath);
        return;
      }
      console.log('>>>>>>>> draw shape', query.shape[s].type);
      // 图形背景色
      if(!query.shape[s].background) {
        query.shape[s].background = 'transparent'
      }
      pointer.fill(query.shape[s].background)
      // 边框颜色
      if(query.shape[s].strokeColor) {
        pointer.stroke(query.shape[s].strokeColor)
      }
      // 边框宽度
      if(query.shape[s].strokeWidth) {
        pointer.strokeWidth(query.shape[s].strokeWidth)
      }
      // 绘制图形
      pointer.draw(query.shape[s].type, ...query.shape[s].value);
      // 重置边框格式
      pointer.stroke();
    }
  }

  // 绘制图片
  if(query.image && query.image.length) {
    for(let n = 0, l = query.image.length; n < l; n++) {
      let imagePath = await saveImg(query.image[n].src);
      allPath.push(imagePath);
      query.image[n].src = imagePath;
      query.image[n] = Object.assign({}, imgOpts, query.image[n]);
      if(!checkQuery(res, query.image[n], 'image', n)){
        //删除本地缓存图片
        await delLocalFile(allPath);
        return;
      }
      console.log('>>>>>>>> draw image',imagePath);
      pointer.draw(`image over ${query.image[n].x},${query.image[n].y} ${query.image[n].w},${query.image[n].h} "${imagePath}"`);
      // gm(imagePath).composite(headimgPath).gravity("SouthEast").geometry(`+50+50`)
    }
  }

  // 获取并绘制二维码
  if(query.qrcode && query.qrcode.length) {
    for(let i = 0, len = query.qrcode.length; i < len; i++) {
      query.qrcode[i] = Object.assign({}, imgOpts, query.qrcode[i]);
      if(!checkQuery(res, query.qrcode[i], 'qrcode', i)) {
        //删除本地缓存图片
        await delLocalFile(allPath);
        return;
      };
      await new Promise((resolve, reject) => {
        let qr_jpg = qr.image(query.qrcode[i].url, {
          type: 'jpg',
          size: 6
        });
        let qrcodeSrc = `./../cache/${Math.random().toString(36).substr(3,8)}`;
        qr_jpg.pipe(fs.createWriteStream(qrcodeSrc));
        allPath.push(qrcodeSrc);
        query.qrcode[i].src = qrcodeSrc;
        console.log('>>>>>>>> create and draw qrcode', qrcodeSrc);
        pointer.draw(`image over ${query.qrcode[i].x},${query.qrcode[i].y} ${query.qrcode[i].w},${query.qrcode[i].h} "${qrcodeSrc}"`);
        resolve();
      });
    }
  }

  // 绘制文字
  if(query.text && query.text.length) {
    for(let x = 0, len = query.text.length; x < len; x++) {
      query.text[x] = Object.assign({}, textOpts, query.text[x]);
      if(!checkQuery(res, query.text[x], 'text', x)) {
        //删除本地缓存图片
        await delLocalFile(allPath);
        return
      };
      // 格式化 text参数， 合并默认配置
      let textArr = textHandle(query.text[x]);
      if(!textArr || !textArr.length) {
        textArr[0] = query.text[x];
      }
      for(let i = 0; i < textArr.length; i++) {
        let t = textArr[i];
        console.log('>>>>>>>> draw text',t.val);
        pointer.font(FONTFAMILY + t.font).fill(t.color).fontSize(t.fontSize).drawText(t.x, t.y, t.val, t.position);
      }
    }
  }

  //图片合成，并上传oss
  await new Promise((resolve, reject) => {
    console.log('>>>>>>>> create image', query.outputPath);
    // .setFormat('png')
    // toBuffer(  (err, buffer)=>{})
    // './cache/' + query.outputPath
    ensureDir('./cache/'+query.outputPath)
    pointer.write('./cache/'+query.outputPath, (err, buffer) => {
    // pointer.setFormat('png').toBuffer((err, buffer) => {
      if (!err) {
          resolve()
          // await saveImg('./../cache/' + query.outputPath)
        // 本地测试专用(图片保存本地，不上传，下面上传逻辑需注释)
        // let outputPath = await saveImg('./../cache/' + query.outputPath)
        // allPath.push(outputPath);

        // 更新oss配置
        // let ossConfig = JSON.parse(JSON.stringify(oss))
        // if(query.ossConfig) {
        //   Object.assign(ossConfig, query.ossConfig);
        // }
        // ossConfig = new OSS(ossConfig);
        // console.log('>>>>>>>> upload image');
        // co(function*() {
        //   let result = yield ossConfig.put(query.outputPath, buffer);
        //   imageUrl = result.url;
        //   // 内网地址转外网地址
        //   console.log('>>>>>>>> 图片绘制并上传完成');
        //   query.outputPath = result.url.replace('-internal', '');
        //   resolve();
        // }).catch((error) => {
        //   returnResult = false;
        //   errMsg = '图片上传失败';
        //   logger.error('图片上传失败: ', error);
        //   resolve()
        // })
      } else {
        console.log('图片绘制失败: ', err)
        returnResult = false;
        errMsg = '图片绘制失败';
        logger.error('图片绘制失败: ', err);
        resolve();
      }
    })
  })

  //删除本地缓存图片
  await delLocalFile(allPath);
  console.log('>>>>>>>>', returnResult ? 'success ' + query.outputPath : 'fail');
  if(returnResult) {
    sendResult(res, {'imageUrl': query.outputPath});
  } else {
    console.log(errMsg);
    sendResult(res, errMsg);
  }
}

// 结果处理
function sendResult(res, data, allPath) {
  let success = true, errMsg = null, code = 200;
  if(typeof data == 'object' || typeof data == 'boolean') {
    success = true;
  } else {
    code = 500,
    success = false;
    errMsg = data;
    data = dataDescription;
  }
  let obj = {
    code,
    'success': success,
    'result': {
      'errMsg': errMsg,
      'object': data,
    }
  };
  res.json(obj)
  // req.body = obj;
}

// 数据格式检测 （校验必填字段）
function checkQuery(res, data, type, i) {
  let errMsg = null;
  switch (true) {
    case type == 'background' && !data.backgroundUrl:
      errMsg = '参数错误：'+ type +' 请求失败或参数不正确';
      break;
    case type == 'background' && !data.outputPath:
      errMsg = '参数错误：outputPath 为必填字段';
      break;
    case type == 'background' && data.width <= 0:
      errMsg = '参数错误：'+ type +' width 不能小于0';
      break;
    case type == 'background' && data.height <= 0:
      errMsg = '参数错误：'+ type +' height 不能小于0';
      break;
    case type == 'qrcode' && !data.url:
      errMsg = '参数错误：'+ type +'[' + i +'].url 参数不正确';
      break;
    case type == 'image' && !data.src:
      errMsg = '参数错误：'+ type +'[' + i +'].src 请求失败或参数不正确';
      break;
    case type == 'text' && !data.val:
      errMsg = '参数错误：'+ type +'[' + i +'].val 参数不正确';
      break;
    case type == 'qrcode' && typeof data.x == 'undefined':
    case type == 'image' && typeof data.x == 'undefined':
    case type == 'text' && typeof data.x == 'undefined':
      errMsg = '参数错误：'+ type +'[' + i +'].x 参数不正确';
      break;
    case type == 'qrcode' && typeof data.y == 'undefined':
    case type == 'image' && typeof data.y == 'undefined':
    case type == 'text' && typeof data.y == 'undefined':
      errMsg = '参数错误：'+ type +'[' + i +'].y 参数不正确';
      break;
    case type == 'qrcode' && data.w <= 0:
    case type == 'image' &&  data.w <= 0:
      errMsg = '参数错误：'+ type +'[' + i +'].w 不能小于0';
      break;
    case type == 'qrcode' && data.h <= 0:
    case type == 'image' &&  data.h <= 0:
      errMsg = '参数错误：'+ type +'[' + i +'].h 不能小于0';
      break;
    case type == 'shape' && !data.value:
      console.log('shape', data)
      errMsg = '参数错误：'+ type +'[' + i +'].value 不能为空';
      break;
    case type == 'shape' && !data.type:
      errMsg = '参数错误：'+ type +'[' + i +'].type 不能为空';
      break;
    case type == 'shape' && data.type && !shapeArr.includes(data.type):
      errMsg = '参数错误：'+ type +'[' + i +'].type 图形绘制方法 '+data.type+' 不存在';
      break;
    default:
  }
  if(errMsg) {
    console.log('参数错误：', errMsg)
    sendResult(res, errMsg);
    return false;
  }
  return true;
}

// 文字处理
function textHandle(textObj) {
  let textlen = getTrueLength(textObj.val);
  let dt = getLineNum(textObj, textlen)
  if(dt.textline < 1) {
    return false
  }
  let textArr = getLineStr(textObj, dt)
  return countPostion(textObj, textArr);
}

// 获取文案长度 （字节）
function getTrueLength(str){
  var len = str.length, truelen = 0;
  for(var x = 0; x < len; x++){
    if(str.charCodeAt(x) > 128){
      truelen += 2;
    }else{
      truelen += 1;
    }
  }
  return truelen;
}

// 计算文案 行数， 及每行的文字长度
function getLineNum(textObj, textlen) {
  let ratio = textlen/textObj.lineLen;
  if(textObj.lineStatus && textObj.lineStatus.length) {
    let length = (textObj.maxLine || textObj.lineStatus.length) + 1
    for(let i = length; i > 0; i--) {
      if(textObj.lineStatus[i] && i < textObj.maxLine) {
        let index  = i == textObj.lineStatus.length-1 ? i : i+1;
        if(ratio > (textObj.lineStatus[i].ratio || index)) {
          console.log('文本总长度为：'+ratio+'行');
          console.log('文本可绘制的最大长度为：'+textObj.lineStatus[i].ratio+'行');
          console.log('每行可绘制的文本比例分别为：'+textObj.lineStatus[index].lineLenArr);
          for(let x = 0; x < textObj.lineStatus[index].lineLenArr.length; x++) {
            textObj.lineStatus[index].lineLenArr[x] = Math.round(textObj.lineLen * textObj.lineStatus[i].ratio * textObj.lineStatus[index].lineLenArr[x])
          }
          console.log('每行可绘制的字节长度分别为：'+textObj.lineStatus[index].lineLenArr);
          return {
            textline: Math.ceil(textlen/textObj.lineLen),
            lineLenArr: textObj.lineStatus[index].lineLenArr
          };
        }
      }
    }
  }
  // 没有lineStatus
  let lineLenArr = [];
  let textline = Math.ceil(textlen/textObj.lineLen);
  for(let i = 0; i < textline; i++) {
    lineLenArr[i] = textObj.lineLen;
  }
  return {
    textline,
    lineLenArr
  }
}

// 分割文案， 截取每行的文案
function getLineStr(textObj, dt) {
  let lineLenArr = dt.lineLenArr;
  let textline = dt.textline;
  let text = textObj.val;
  let start = 0, len = 0, strLen;
  let textArr = [];
  let lineIndex = 0;
  if (textline > textObj.maxLine) {
    console.log('原文本为：'+text);
    let textLength = 0;
    for(let i = 0; i < textObj.maxLine; i++) {
      textLength += lineLenArr[i];
    }
    for(let strLen = 0; strLen < text.length; strLen++) {
      if(text.charCodeAt(strLen) > 128){
      	len  += 2;
      }else{
      	len  += 1;

      }
      if(len >= textLength && strLen < text.length-1) {
        let end = text.charCodeAt(strLen) > 128 ? strLen-1 : strLen-2;
        text = text.substring(start,end > start ? end : start) + '...';
        console.log('截断后为：'+text);
        break;
      }
    }
    start = 0, len = 0, strLen = 0;
  }
  for(let strLen = 0; strLen < text.length; strLen++) {
    if(text.charCodeAt(strLen) > 128){
    	len  += 2;
    }else{
    	len  += 1;

    }
    if(len >= lineLenArr[lineIndex] || strLen+1 == text.length){
      	len = 0;
        textArr.push(text.substring(start,strLen+1 == text.length ? text.length : strLen+1));
        start = strLen+1;
        lineIndex++;
      }
  }
  return textArr;
}

// 重新计算每行文案的 位置
function countPostion(textObj, textArr) {
  let arr = [];
  let textHeight = (textArr.length - 1) * textObj.lineHeight;
  let originY = textObj.y;
  if(textObj.vertical === 'center') {
    originY = textObj.y - (textHeight/2)
  } else if(textObj.vertical === 'bottom') {
    originY = textObj.y -textHeight/2
  }
  for(let i = 0; i < textArr.length; i++){
    arr[i] = JSON.parse(JSON.stringify(textObj));
    arr[i].y = originY >= 0 ? originY : 0;
    arr[i].val = textArr[i];
    originY += textObj.lineHeight;
  }
  return arr;
}
