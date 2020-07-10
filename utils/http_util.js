/**
 * 发送http请求工具类
 * @module utils
 * @class http_util
 * @constructor
 */

const request = require('request');
var iconv = require('iconv-lite'); //引入模块


exports.httpGet = async function(urlPath, data){
    return new Promise((resolve, reject)=>{
        urlPath = encodeURI(parseGetParam(urlPath, data));
        request({url:urlPath, timeout:10000}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let result = body;
                resolve(result)
            }else{
                resolve(null)
            }
        });
    })
};


exports.httpNormalGet = async function(urlPath, data){
    return new Promise((resolve, reject)=>{
        urlPath = encodeURI(parseGetParam(urlPath, data));
        request({url: urlPath, encoding: null}, (err, httpResponse, body)=>{
            if(err){
                resolve(null)
            }
            try{
                var buf = iconv.decode(body, 'gb2312').toString(); //解码gb2312
                resolve(eval(buf))
            }catch(e){
                resolve(null)
            }
        })
    })
};

exports.httpPost = async function(opt){
    return new Promise((resolve, reject)=>{
        opt.timeout = 10000;
        request.post(opt, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)
            }else{
                resolve(null)
            }
        });
    })
};


/**
 * get请求获取远程URL数据
 * @param {String} url
 * @param {Object} data
 * @param {Function} callback
 */
exports.get = function(url, data, callback){
    url = encodeURI(parseGetParam(url, data));
    request.get(url,{timeout:10000}, (err, httpResponse, body)=>{
        if(err){
            return callback(err, null);
        }
        try{
            let result = JSON.parse(body);
            return callback(null, result);
        }catch(e){
            return callback("获取失败~", null);
        }
    })
}
/**
 * get请求获取远程URL数据 返回非JSON数据
 * @param {String} url
 * @param {Object} data
 * @param {Function} callback
 */
exports.getNormal = function(url, data, callback){
    url = encodeURI(parseGetParam(url, data));
    request.get(url, (err, httpResponse, body)=>{
        if(err){
            return callback(err, null);
        }
        callback(null, body);
    })
}
/**
 * 转化get参数
 * @param url
 * @param params
 */
function parseGetParam(url, params){
    let bf_str = '';
    if(url && url.indexOf("?")!=-1){
        bf_str = "&";
    }else{
        bf_str = "?";
    }
    if(params){
        let n = 0;
        for(let i in params){
            if(n==0){//至少有一个元素
                url+=bf_str;
                url+=i+"="+params[i];
            }else{
                url+="&"+i+"="+params[i];
            }
            n++;
        }
    }

    return url;
}
/**
 * post请求获取远程URL数据
 * @param {String} url
 * @param {Object} data
 * @param {Function} callback
 */
exports.post = (url, data, callback)=>{
    //LogUtil.log("&&&&&&&& url:"+url);
    //LogUtil.log("&&&&&&&&url_data:%j", data);
    request.post({url:url, form: data, timeout:10000}, (err, httpResponse, body)=>{
        if(err){
            return callback(err, null);
        }
        try{
            let result = JSON.parse(body);
            return callback(null, result);
        }catch(e){
            return callback("获取失败~", null);
        }
    })
}

/**
 * post请求获取远程URL数据
 * @param {String} url
 * @param {Object} data
 * @param {Function} callback
 */
exports.postAsync = async (url, data) => {
    //LogUtil.log("&&&&&&&& url:"+url);
    //LogUtil.log("&&&&&&&&url_data:%j", data);
    return new Promise((resolve, reject) => {
        request.post({url: url, form: data, timeout: 10000}, (err, httpResponse, body) => {
            if (err) {
                reject(err);
            } else {
                try {
                    let result = JSON.parse(body);
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            }
        })
    })
}