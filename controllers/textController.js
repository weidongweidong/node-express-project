/*
 * @Descripttion: 
 * @Author: chenweidong
 * @Date: 2020-04-09 09:43:38
 * @LastEditors: chenweidong
 * @LastEditTime: 2020-04-10 13:30:44
 */

const articleDao = require('../models/article');
const fs = require('fs');
const path = require('path');

exports.Serial1 = async (req, res, next) => {
    let result ={};
    try{
        let env = process.env.NODE_ENV;
        if(env == 'dev'){
            result.title= '开发环境';
        }
        if(env == 'pro'){
            result.title = '生产环境'; 
        }
        return res.render('index',result);
    }catch(e){
        console.log(e);
        throw e;
    }
}

exports.Serial2 =async function(req,res,next){
    try{
        let result ={};
        //添加
        // let re =  await articleDao.insert({title:"测试",author:"陈伟东",url:"www.baidu.com"});
        //查询
        let re =  await articleDao.list();
        //修改
        // let re =  await articleDao.update("5e8ecb3eebc65e9b3e170591",{title:"title"});
        //删除
        // let re =  await articleDao.delete("5e8ecba9f3ce279b58207f0a");
        result.title = re;
        return res.render('index',result);
    }catch(e){
        console.log(e);
        throw e;
    }
    
}

exports.Serial3 =async function(req,res,next){
    try{
        let result ={};
        // 取
        let aa=  req.cookies.name1;
        // 存
        res.cookie('name1','xiaohigh');
        // 存， 并设置时间。 
        // res.cookie('name','xiaohigh', {maxAge: 600000})
        /**
         * res.cookie('haha',  'name1=value1&name2=value2',  {maxAge:10*1000,  path:'/',  httpOnly:true });
            name=value：键值对，可以设置要保存的 Key/Value，注意这里的 name 不能和其他属性项的名字一样
            Expires： 过期时间（秒），在设置的某个时间点后该 Cookie 就会失效，如 expires=Wednesday, 09-Nov-99 23:12:40 GMT
            maxAge： 最大失效时间（毫秒），设置在多少后失效
            secure： 当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效
            Path： 表示 cookie 影响到的路，如 path=/。如果路径不能匹配时，浏览器则不发送这个Cookie
            httpOnly：是微软对COOKIE做的扩展。如果在COOKIE中设置了“httpOnly”属性，则通过程序（JS脚本、applet等）将无法读取到COOKIE信息，防止XSS攻击产生
         */
        // 删
        res.clearCookie('name1')

        
        result.title = aa;
        return res.render('index',result);
    }catch(e){
        console.log(e);
        throw e;
    }
    
}
/**
 * @description:  如果想用中间件捕获异常的话，  需要用next() , 将错误信息以参数的形式传递下去， 到中间件的时候就会被捕获了。
 * throw 的方式不行， 这种直接终止了程序的运行。 
 * @param {type} 
 * @return: 
 */
exports.Serial4 = async function(req,res,next){
    try{
        ad ==kk;
    }catch(e){
       next(e);
    }
}
/**
 * @description: 可读流， 写入流。 
 * @param {type} 
 * @return: 
 */
exports.Serial5 = async function(req,res,next){
    try{
        var defpath=path.join(__dirname,'../')
        // 读取文件为一个缓冲区
        // let file = fs.readFileSync(defpath+'logs/fs_test.txt');
        // console.log(file.toString());


        // 创建可读流
        // var readerStream = fs.createReadStream(defpath+'logs/fs_test.txt');
        // // 设置编码为 utf8。
        // readerStream.setEncoding('UTF8');
        // var data ='';
        // // 处理流事件 --> data, end, and error
        // readerStream.on('data', function(chunk) {
        // data += chunk;
        // });

        // readerStream.on('end',function(){
        //     console.log(data);
        // });

        // readerStream.on('error', function(err){
        //     console.log(err.stack);
        // });
        // console.log("程序执行完毕");


        // 创建写入流： 
        // let writerStream = fs.createWriteStream(defpath + 'logs/text1.txt');
        // writerStream.write('hello world!','UTF8');
        // // 监听写入事件完成。
        // writerStream.on('finish', function() {
        //     console.log("写入完成。");
        // });
        // //标记写完了， 
        // writerStream.end();


        // // 创建一个可读流
        // var readerStream = fs.createReadStream(defpath + 'logs/access.log.2020-04-10');
        // // 创建一个可写流  默认不写路径的话， 是在根目录创建一个文件。 
        // var writerStream = fs.createWriteStream('output.txt');
        // writerStream.on('finish', function() {
        //     console.log("写入完成。");
        // });
        // // 管道读写操作
        // // 读取文件内容，并将内容写入到 output.txt 文件中
        // readerStream.pipe(writerStream);

        // fs.unlink('output.txt', function(){
        //     console.log("删除完成～");
        // })
        
    }catch(e){
       next(e);
    }
}