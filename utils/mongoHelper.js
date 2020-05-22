var mongoose = require('mongoose');



const pools = {}

exports.pool = function(name,conf){
    if(pools[name]){
        return pools[name]
    }
    var db       = mongoose.createConnection(conf,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
        auto_reconnect: true,
        poolSize: 2
    });
    pools[name] = db;
    db.on('error',function (err) {
        console.log('Mongoose connection error: ' + err);
    });
    return db;
}


exports.find = async function(model,query,fields,options){
    return new Promise((resolve, reject)=>{
        model.find(query,fields,options,function(err,res){
            if(err){
                reject(err)
                return
            }
            resolve(res)
        })
    })
}

exports.count = async function(model,query){
    return new Promise((resolve, reject)=>{
        model.count(query,function(err,res){
            if(err){
                reject(err)
                return
            }
            resolve(res)
        })
    })
}

exports.findOne = async function(model,query){
    return new Promise((resolve, reject)=>{
        model.findOne(query,function(err,res){
            if(err){
                reject(err)
                return
            }
            resolve(res)
        })
    })
}

exports.aggregate = async function(model,array){
    return new Promise((resolve, reject)=>{
        model.aggregate(array,function(err,res){
            if(err){
                reject(err)
                return
            }
            resolve(res)
        })
    })
}

exports.populateForTwo = async function (model, query, fields, options, populate) {
    return new Promise((resolve, reject) => {
      model.find(query, fields, options)
        .populate(populate[0])
        .exec(function (err, doc) {
          if (err) {
            reject(err)
            return
          }
          resolve(doc)
        })
    })
  }

exports.distinct = async function(model, args, query) {
    return new Promise((resolve, reject) => {
        model.distinct(args, query, function(err,res) {
            if(err) {
                reject(err)
                return
            }
            resolve(res)
        })
    })
}

exports.populateOne = async function(model,query,path,select){
    return new Promise((resolve, reject)=>{
        model.findOne(query)
        .populate({path: path,select:select})
        .exec(function(err, doc) {
            if(err){
                reject(err)
                return
            }
            resolve(doc)
        })
    })
}


exports.insert=async function(model) {
    return new Promise((resolve,reject)=>{
        model.save(function (err,res) {
            if(err){
                reject(err)
                return
            }
            resolve(res)
        })
    })
}
exports.updateFirst = async function (model, query, update) {
    return new Promise((resolve, reject) => {
        model.update({_id: id}, {$set: update}, {multy: false}, function (err, res) {
            if (err) {
                reject(err)
                return
            }
            resolve(res)
        })
    })
}