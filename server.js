
const _        = require('lodash');
const NODE_ENV = process.env.NODE_ENV;
const NODE_ROUTER = process.env.NODE_ROUTER;
const PORT =  process.env.PORT 

if (_.isUndefined(NODE_ENV)) {
  console.log('请先指定环境变量,NODE_ENV,值为 dev || pro');
  return process.exit(1);
}
if (_.isUndefined(NODE_ROUTER)) {
  console.log('请先指定工作路由,NODE_ROUTER,值为 dev || pro');
  return process.exit(1);
}

const settings = require(`./conf/${NODE_ENV}/settings`);
const nodejieba = require("nodejieba");
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const adaro = require('adaro');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Router = require(`./routes/${NODE_ROUTER}/router`);
const http = require('http');
const winston         = require('winston');
const expressWinston  = require('express-winston');
const log = require('./logger.js');

console.log(__dirname)
nodejieba.load({
  idfDict: __dirname + '/controllers/idf.utf8'
});

var app = express();

// view engine setup  dust
// 设置dust模版
app.engine('dust', adaro.dust());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'dust');
// // 日志设置
// app.use(logger('dev'));
// 设置通过js向后台post一些文件信息时 的文件大小；
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 用以开始控制cookie 信息的： 
app.use(cookieParser());


// 设置静态目录
// app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  next();
});

// 请求日志的记录
app.use(log.expressLogger);

app.use('/', Router);

// 请求错误日志的记录
app.use(log.errorLogger);



// error handler  捕获异常的方法
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // 跳转错误页面。
  res.status(err.status || 500);
  res.render('error');
});

var debug = require('debug')('node-express-project:server');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(PORT || '3001');
app.set('port', port);
/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 * 服务器监听端口。
 */

server.listen(port,function(){
  console.log("http://127.0.0.1:"+port)
  // const time = new Date();
  // logger('HTTP server listening on %d pid', port, process.pid, time);
});


/**
 * Normalize a port into a number, string, or false.
 * 判断端口号是否正确
 */

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}



server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 * 监听http 错误事件
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 * 监听http  监听端口事件
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

// dev 修改 