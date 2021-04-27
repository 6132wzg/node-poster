// 字段校验中间件
const verifyFields = (fields = []) => (req, res, next) => {
  let errMsg = ''
  let query = req.method === 'GET' ? req.query : req.body
  // console.log('query', query)
  fields.forEach(f => {
    if (!(f in query)) {
      errMsg = `field [${f}] required`
    }
  })
  if (errMsg) {
    res.status(400).json({ msg: errMsg, code: 400, data: null })
    return
  } else {
    next()
  }
}

module.exports = verifyFields
