
const mongoose = require('mongoose');
const articleDao = require('../models/article');
const HttpUtil = require('../utils/http_util');
var http=require('http');
const classDao = require('../models/class');
const moment = require('moment');
const readline = require('readline');
const path = require('path');
// const images = require('images');
const qr = require('qr-image');
const request = require("request");
const svg2png = require('svg2png');
const textToSVG = require('text-to-svg');
const fs = require('fs');
const { trimEnd } = require("lodash");
const gm = require('gm').subClass({imageMagick: true});//一定要加imageMagick: true，否则会报错
const log4js = require('log4js');
const log4js_redis = require("@log4js-node/redis");


function mylayout(config) {
    return function (logEvent) {
        const arr = logEvent.data;
        let throwable = "";
        let normalMsg = "";
        arr.forEach(e => {
            if (e && e.message && e.stack) {
                throwable = Object.assign({message: e.message, stack: e.stack});
            } else {
                if (e && typeof e == "object") {
                    normalMsg += "  " + JSON.stringify(e);
                } else {
                    normalMsg += "  " + e;
                }
            }
        })
        const message = {
            createTime: logEvent.startTime,
            level: logEvent.level.levelStr,
            message: normalMsg,
            platform: "Nodejs",
            serverIp: getIPAdress(),
            serverName: appName,
            type: "redis-logs",
            throwable: throwable ? JSON.stringify(throwable) : "",
        };
        return message;
    }
}

function getIPAdress() {
    if (localIp) return localIp;
    let localIPAddress = "";
    let interfaces = os.networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                localIPAddress = alias.address;
            }
        }
    }
    localIp = localIPAddress;
    return localIPAddress;
}
exports.for = async (req, res, next) =>{
    while(1==1){
        console.log("11");
    }
   
}

exports.add = async (req, res, next) =>{
   let aa =   moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
   console.log(aa);
    // await classDao.insert({name: "new Date()",tiem : new Date()});
   let bb= await classDao.find({ tiem : moment("2021-06-08 15:00:00")});
   console.log(bb);
   res.send({a
    : "hello "});
}


let send = {
    'Error:':'查询失败',
    'code':400,
}

exports.douyin = async (req, res, next)=>{

    let { url } = req.query;
    url = httpString(url);

    //前端传过来的地址 进行重定向拿到 item_ids 并且返回
    let watermark = await new Promise(resolve=>{
        request(url,(error, response, body) => {
            if (!error && response.statusCode == 200) {
                let href = response.request.href;
                let id = void 0;
                try {
                    id = href.match(/video\/(\S*)\/\?region/);
                } catch (error) {
                    res.json(send)
                    return false;
                }
                resolve(`https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${id}`);
            }else{
                res.json(send)
            }
        })
    });

    //拿到完整地址返回指定数据 
    request(watermark,async (error, response, body)=>{
        if (!error && response.statusCode == 200) {

            let result = JSON.parse(body);
            let data = result.item_list[0];
            //视频url解析
            let video = await videourl(data['video']["play_addr"]["url_list"][0]);
            // 拼接返回指定数据
            res.json({
                'title':data["share_info"]["share_title"],
                'cover':data['video']["origin_cover"]["url_list"][0],
                'video':video,
                'audio':data['music']["play_url"]["uri"],
                'code':200,
            })
        }else{
            res.json(send)
        }
    })
}

//解析视频
const videourl = async (url)=>{
    //截取字符串 wm
    url = url.replace(/wm/g,'');
    return await new Promise(resolve=>{
        request(url,(error, response, body) => {
            resolve(response.request.href)
        })
    })
}

//解析字符串里面的url
const httpString = (s) =>{
    let reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
    try {
        return s.match(reg)[0];
    } catch (error) {
        return null;
    }
}

exports.aline = async (req, res, next) =>{
    res.send({a
     : "hello "});
}



exports.log=  async (req, res,next)=>{
     try{
        log4js.addLayout("mylog", mylayout())
        log4js.configure({
            "appenders": {
                "stdout": {"type": "console", layout: {type: "mylog"}},
                "mylog": {
                    type: "@log4js-node/redis",
                    host: "172.17.20.151",
                    port: 6379,
                    pass: "",
                    channel: this.appName,
                    layout: {
                        type: "mylog"
                    }
                }
            },
            categories: {
            default: {"appenders": ["stdout"], "level": "debug"},
                mylog: {"appenders": ["mylog"], "level": "info"}
            },
            replaceConsole: true
        });
        const logger = log4js.getLogger("text");


        logger.info("log 测试");
     }catch(e){
        console.log(e);
     }
}

exports.Serial14 = async (req, res, next) => {
    let result ={};
    try{
        let env = process.env.NODE_ENV;
        if(env == 'dev'){
            result.title= '1';
        }
        if(env == 'pro'){
            result.title = '2'; 
        }
        result.arr = [1,2,3,4,5];
        return res.render('index',result);
    }catch(e){
        console.log(e);
        throw e;
    }
}
exports.Serial1 = async (req, res, next) => {
    let result ={};
    try{
        let env = process.env.NODE_ENV;
        if(env == 'dev'){
            result.title= '1';
        }
        if(env == 'pro'){
            result.title = '2'; 
        }
        result.arr = [1,2,3,4,5];
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
        // let re =  await articleDao.list();
        //修改
        // let re =  await articleDao.update("5e8ecb3eebc65e9b3e170591",{title:"title"});
        //删除
        // let re =  await articleDao.delete("5e8ecba9f3ce279b58207f0a");
        let arr = [{title:"测试批量插入",author:"陈伟东",url:"www.baidu.com"},{title:"测试批量插入1",author:"陈伟东",url:"www.baidu.com"},{title:"测试批量插入2",author:"陈伟东",url:"www.baidu.com"}];
        let re = await articleDao.insertMany(arr);
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

exports.Serial6 = async function(req,res,next){
    try{
        let a = "abc"
        // res.send(a);
        res.write(a);
        res.end();
    }catch(e){
        next(e);
    }
}

exports.Serial7 = async function(req,res,next){
    try{
        // let keyword =  req.body.word;
        nodejieba.load({
            idfDict: __dirname + '/idf.utf8'
        });
        // 如果要是改词频， 需要去node_modules 里面弄。 idf.utf8
        var sentence = "跪求菩萨保佑宫内好孕";
        var result;
        var topN = 3;
        result = nodejieba.extract(sentence, topN);
        console.log(result);
        result.forEach(function(a,index){
            res.write(a.word +":"+a.weight + '\n');
        });
        res.end();
    }catch(e){
        next(e);
    }
}

exports.Serial8 = async function(req,res,next){
    try{
        var _text = "联系人：xxx     手机号：13200000000";
        var _url = "http://www.cnblogs.com/jaxu";
        var _buffer = await genQrImage(_text, _url);
        res.setHeader('Content-type', 'image/png');
        this.body = _buffer;
        res.end();
    }catch(e){
        console.log(e);
        next(e);
    }
}

exports.Serial9 = async function(req,res,next){
    try{
        // 创建一个图片，上面写上字
        var defpath=path.join(__dirname,'../')
        gm(200, 400, "#ddff99f3")
        .drawText(10, 50, "hello world ")
        .write(defpath + 'logs/white.png', function (err) {
            console.log(err);
        });
        res.end();

        // // 创建背景图片
        // gm(1000, 1000, "#ffffff").fontSize(80).drawText(whidth, 950, name) 
        // .write(static_url + '/white.png', function (err) {
        //     // 合到一起
        //     gm().command("composite")
        //     .in("-gravity", "North")
        //     .in(basePath)
        //     .in('-page', '+10+20')
        //     .in(static_url + '/white.png')
        //     .write( static_url + '/basePath.png', function (err) {
        //        if(!err){  
        //          // 将生成的图片上传服务器
        //          let readStrm = fs.createReadStream(static_url + '/basePath.png');
        //          utils.uploadStream(readStrm, picNmae, function (img) {
        //            fs.unlinkSync(static_url + '/basePath.png');
        //            fs.unlinkSync(basePath);
        //            fs.unlinkSync(static_url + '/white.png');
        //            return res.json({data: {qrCode: img}, code: 0, msg: "success"})
        //          });
        //        }else{
        //          console.log(err);
        //        }
        //     });
        // });
    }catch(e){
        next(e);
    }
}



exports.Serial10 = async function(req,res,next){
    try{
        // 多表联查
        let id = '5e8ecbaaf3ce279b58207f0b';

        //  同库关联查询
        let re =  await articleDao.tongkupopulateOne(id);

        //  异库关联查询
        // let re =  await articleDao.yikupopulateOne(id);
        // 同库查询的 lookup方法

        //  aggregate聚合函数   lookup关联查询
        let res =  await articleDao.aggregate([
            //$toObjectId  将字符串转成objectid ，选择输出文档的字段，如果要哪个字段， 就设置  字段：1 
            {$project:{class_id:{$toObjectId:"$class_id"},title:1,author:1}},   
            // 使用关联符号，lookup form 从哪个表； localField:本表字段，foreignField：对应的外表字段， as 字段输出名字。
            {$lookup:{from:"class",localField:"class_id",foreignField:"_id",as:"classFrom"}},
            // 筛选符号， 条件写这， 
            {$match:{_id: mongoose.Types.ObjectId(id)}},
            // 排序
            { $sort: {"data.total": -1} },
            // 从第几个开始
            { $skip: 0},
            // 查多少
            { $limit: 2},
            // 字符串排序： 按中文排序
            // { $collation: {"locale": "zh", numericOrdering:true}},
            // 分组
            // { $group: {
                    // 声明分组后都有哪些字段  
                    // _id 用谁
            //       _id: "$yizhuId",
                    // 第一次出现的这个字段 
            //       yizhuId:{$first:"$yizhuId"},
                    // 第一次出现的这个字段
            //       data:{$first:"$data"},
                     // 第一次出现的这个字段
            //       createAt:{$first:"$createAt"}
            //     }
            //   }
           ]);


        
        // 创建索引
        // db.getCollection('articles').createIndex({author: 1}, {collation: {locale: "zh"}})

        //查询语句， 按照 字符排序。 
        //db.stock.find({}).collation({"locale": "zh", numericOrdering:true}).sort({‘字段名’:1})
        
        res.send(re);
    }catch(e){
        console.log(e);
        next(e);
    }
}

exports.Serial12 = async function(req,res,next){
    try{

        let arr =[];
        var readstream = fs.createReadStream(__dirname+'/urls.txt');
        
        //创建逐行读取
        var rl = readline.createInterface({
            input:readstream
        })
        //读行
        rl.on('line',function(data){
            arr.push(data);
        }).on('close',async function(){
            //结束后调用的
            console.log(arr);
            // let url ="https://cloud.haoyunbang.cn/api/baidu/shoulu";
            let url = 'http://127.0.0.1:8012/baidu/shoulu';
            var opt = {
                method: "POST",
                url: url,
                json: true,
                form: {urls: arr.join(',')}
            };
            let result =  await HttpUtil.httpPost(opt);
            console.log(result);
            res.send(result|| '空的');
        })
    }catch(e){
        conso.log(e);
        next(e)
    }
}
exports.hello = async function(req,res,next){
    try{
        let date =  moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        let hello = {
            dev:{
               aa:date
            },
            pro:{
               aa:2
            }
        }
        console.log(date);

        return res.send(hello);
    }catch(e){
        console.log(e)
        next(e)
    }
}
exports.Serial13 = async function(req,res,next){
    
    try{
        let a =  {};
        try{
            let b = a.bb.cc;
        }catch(e){
            console.log("里面的错："+e);
        }
        console.log("abcdefg")

    }catch(e){
        console.log("外面的错："+e);
    }
    //结果： 
    /**下面为打印结果:
     * 里面的错：TypeError: Cannot read property 'cc' of undefined   textController.js:343
               abcdefg
     */
}

exports.Serial11 = async function(req,res,next){
    try{

        console.log(__dirname);
        //定义分割后每个文件的行数
        var rows = 2000;
        //用来存储结果的变量
        var arr=[];
        //创建文件流    //要分割的文件
        var readstream = fs.createReadStream(__dirname+'/urls.txt');
        //创建逐行读取
        var rl = readline.createInterface({
            input:readstream
        })
        //读行
        rl.on('line',function(data){
            arr.push(data);
        }).on('close',function(){//结束后调用的
            for (var i=0;i<Math.ceil(arr.length/rows);i++) {
                let start =  i*rows;
                let end =  i*rows+rows;
                fs.writeFile(__dirname+'/urls_<'+start +','+end+'>.txt',arr.slice(start,end).join('\r\n'),function(){
                    //读取当前文件，请求， 然后删除这个文件， 
                    let file = fs.readFileSync(__dirname+'/urls_<'+start +','+end+'>.txt');
                    // 内容
                    file = file.toString();
                    // 请求  file是请求的参数
                    postBaidu();
                    //响应参数
                    if(1){
                        // 请求成功后 打印结果， 并删除该文件
                        fs.unlinkSync(__dirname+'/urls_<'+start +','+end+'>.txt')
                        console.log(start+'到'+end+"行数据提交成功！");
                    }else{
                        console.log(start+'到'+end+"行数据提交失败！  文件:urls_<"+start+","+end+">.txt已保存在目录下 失败的文件请单独提交");
                        console.log('错误信息为:err');
                    }
                });
            }
        })
        
    }catch(e){
        console.log(e);
    }
}



async function genQrImage(text, url) {
    const tts = textToSVG.loadSync(path.join(__dirname, '../utils/msyh.ttf'));
    const tSvg = tts.getSVG(text, {
        x: 0,
        y: 0,
        fontSize: 20,
        anchor: 'top'
    });
    const margin = 35; // 二维码的左右边距
    const top = 90; // 二维码距顶部的距离
    var sourceImage = '' // images(path.join(__dirname, '../utils/girl.png'));
    var w = sourceImage.width(); // 模板图片的宽度
    return svg2png(tSvg)
        .then((rst) => {
            var textImage = images(rst);
            var qrImage = images(qr.imageSync(url, {type: 'png'})).size(w - margin * 2); // 二维码的尺寸为：模板图片的宽度减去左右边距
            return sourceImage
                .draw(qrImage, margin, top) // 二维码的位置：x=左边距，y=top
                .draw(textImage, (w - textImage.width()) / 2, top + qrImage.height() + 10) // 底部文字，x为居中显示，y=top+二维码的高度+10
                .encode('png', {quality: 90});
        })
        .catch(e => console.error(e));
};

async function postBaidu(){
   
    var bodyString = 'https://m.haoyunbang.cn/topic/info/5ec87b5ab4202e0077a413b5';
    
    var headers = {
        'Content-Type': 'text/plain',
        'Content-Length': bodyString.length
    };
    
    var options = {
        host: 'data.zz.baidu.com',
        path: '/urls?site=https://m.haoyunbang.cn&token=7yo16nMlHys9545x',
        method: 'POST',
        headers: headers
    };
    
    var req = http.request(options, function (res) {
        res.setEncoding('utf-8');
    
        res.on('data', function (data) {
            console.log('结果:', data);
        });
    });
    req.write(bodyString);
    req.end();
  }