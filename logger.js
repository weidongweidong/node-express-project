/*
 * @Descripttion: 日志记录
 * @Author: chenweidong
 * @Date: 2020-04-09 18:04:45
 * @LastEditors: chenweidong
 * @LastEditTime: 2020-04-10 11:14:50
 */

const winston         = require('winston');
const expressWinston  = require('express-winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const moment          = require('moment');
const dateFormat      = function () { return moment().format('YYYY-MM-DD HH:mm:ss:SSS'); };


// 自定义的一个这么玩意， 里面写了多久生成一个日志， 按日期进行轮转， 日志大小，生成日志地址， 名字。  
const accessLoggerTransport = new DailyRotateFile({
    name       : 'access',
    filename   : 'logs/access.log',
    timestamp  : dateFormat,
    level      : 'info',
    colorize   : true,
    maxsize    : 1024 * 1024 * 10,// 10M
    datePattern: 'YYYY-MM-DD'
});
/**
 * 用expressWinston 创建一个日志对象，记录的所有请求的。   
 */
exports.expressLogger = expressWinston.logger({
    transports: [
        accessLoggerTransport
    ]
});


//  专门请求错误日志记录
// 自定义的一个这么玩意， 里面写了多久生成一个日志， 按日期进行轮转， 日志大小，生成日志地址， 名字。  
const errorLoggerTransport = new DailyRotateFile({
    name       : 'error',
    filename   : 'logs/error.log',
    timestamp  : dateFormat,
    level      : 'info',
    colorize   : true,
    maxsize    : 1024 * 1024 * 10,// 10M
    datePattern: 'YYYY-MM-DD'
});
/**
 * 用expressWinston 创建一个日志对象，记录的所有请求的。   
 */
exports.errorLogger = expressWinston.errorLogger({
    transports: [
        errorLoggerTransport
    ]
});