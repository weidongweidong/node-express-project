
const NODE_ENV          = process.env.NODE_ENV;
const fs                = require('fs');
const path              = require('path');
const confDir           = path.resolve(__dirname);
const appDir            = path.resolve(confDir, '../../');// 项目根目录

exports.appDir          = appDir;// 项目的根目录
exports.serverId         = process.pid;


exports.logger = {
    categoryName: 'mall',// 日志分类的名字
    level       : 'debug',// 日志记录级别
};

exports.databases = {
    local:{
        "name":"local",
        "config":"mongodb://root:root@localhost:27017/local_zhuanzhen"
    },
};

console.log('-------------载入配置信息start-----------');
console.log('当前环境是: NODE_ENV = ', NODE_ENV);
console.log('当前环境是: NODE_ROUTER = ', process.env.NODE_ROUTER);
console.log(`配置文件: ${NODE_ENV}/settings.js,被载入`);
console.log('-------------载入配置信息end ------------');
