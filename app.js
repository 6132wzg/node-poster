const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const config = require('./config')
// const Sentry = require('@sentry/node')

// const emallRouter = require('./routes/emall')
// const minaRouter = require('./routes/mina')
// const saasRouter = require('./routes/saas')
// const userRouter = require('./routes/user')
// const saasMinaRouter = require('./routes/saas-mina')
// const dmallMRouter = require('./routes/dmall-m')
// const mRouter = require('./routes/m')
// const otherRouter = require('./routes/other')
const testRouter = require('./routes/test')
const posterRouter = require('./routes/poster')

const app = express()

// Sentry.init({
//   dsn: config.sentry_dsn,
//   environment: process.env.NODE_ENV
// })

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers','*')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  next()
})
// app.use(Sentry.Handlers.requestHandler())

app.set('view engine', 'ejs')
app.set('view cache', false)
// 静态页面
app.use(express.static(__dirname + '/public'))
// 静态资源
app.use('/temp',express.static(__dirname + '/temp'))

app.use(logger('dev'))
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: 2 * 1024 * 1024
  })
)
app.use(bodyParser.json())

// app.use('/user', userRouter)
// app.use('/mina', minaRouter)
// app.use('/emall', emallRouter)
// app.use('/saas', saasRouter)
// app.use('/saas-mina',saasMinaRouter)
// app.use('/dmall-m', dmallMRouter)
// app.use('/m', mRouter)
// app.use('/other', otherRouter)
app.use('/test', testRouter)
app.use('/poster', posterRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// app.use(Sentry.Handlers.errorHandler())

// error handler
app.use(function onError(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({
    code: err.status || 500,
    data: null,
    msg: err.message
  })
})

app.listen(config.port, e => {
  console.log(`[node screenshot] is running on http://localhost:${config.port}`)
})
