const nodejieba = require("nodejieba");
const mongoose = require('mongoose');
const articleDao = require('../models/article');
const classDao = require('../models/class');
const path = require('path');
const images = require('images');
const qr = require('qr-image');
const svg2png = require('svg2png');
const textToSVG = require('text-to-svg');
const fs = require('fs')
const gm = require('gm').subClass({imageMagick: true});//一定要加imageMagick: true，否则会报错

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
        // nodejieba.load({
        //     idfDict: __dirname + '/idf.utf8'
        // });
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
        // let re =  await articleDao.tongkupopulateOne(id);

        //  异库关联查询
        // let re =  await articleDao.yikupopulateOne(id);
        // 同库查询的 lookup方法

        //  aggregate聚合函数   lookup关联查询
        let re =  await articleDao.aggregate([
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
    var sourceImage = images(path.join(__dirname, '../utils/girl.png'));
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