
const mongoHelper = require('../utils/mongoHelper');
const mongoose = require('mongoose');
const settings = require(`../conf/${process.env.NODE_ENV}/settings`);
const articlesSchema = new mongoose.Schema({
    title: { 
        type: String
    },
    author: {
        type: String
    },
    url: {
        type: String
    },
    // 同库时： 此处定义的外建， 可以是object id ,  也可以是 字符串， 会自动转成 objetid  但是测试数字不行。 
    class_id :{
        type: mongoose.Schema.Types.ObjectId,  // 只有同库的时候才有用，  // 异库时这俩没用
        ref: 'class' // 同库时 ， 该指向必须写， 要不然不知道关联的哪个库的。  
    }

    // class_id:{  // 异库的话，只这么写就行了，不用ref 指向， 没用。 
    //     type :String
    // }
});
var mongoUtil = mongoHelper.pool(settings.databases.text1.name,settings.databases.text1.config)
const articlesModel = mongoUtil.model('articles',articlesSchema, 'articles');

const text2_classSchema = new mongoose.Schema({
    name: { 
        type: String
    },
});
var mongoUtil = mongoHelper.pool(settings.databases.text2.name,settings.databases.text2.config)
const text2_classModel = mongoUtil.model('class',text2_classSchema, 'class');

exports = module.exports = {
    insertMany : async function(arr){
       return await articlesModel.insertMany(arr);
    },
    list: async function(query,page,limit,sort){
        let options = {};
        if(!sort) {
          options = {sort: {weight: -1}}
        }else {
          options = {sort: sort}
        }
        page = page ? page : 1
        limit = limit ? limit : 10
        let data = await articlesModel.find(query, null, options).skip((page-1) * limit).limit(limit);
        return data;
    },
    findById: async function(id){
        let result = await mongoHelper.findOne(articlesModel, {_id:id});
        return result
    },
    insert: async function(model){
        let obj = new articlesModel(model);
        let result =  await mongoHelper.insert(obj);
        return result;
    },
    update: async function(id,query){
        let result = await articlesModel.update({_id:id},query);
        return result;
    },
    delete: async function(id){
        let result = await articlesModel.deleteOne({_id:id});
        return result;
    },
    tongkupopulateOne: async function(id){
        //  同库： 可直接将  path ,声明用哪个外建去查，外建声明的时候要声明ref对应的表，  select 可选字段。选择展示哪些字段。 
        let result = await mongoHelper.populateOne(articlesModel, {_id:id},'class_id','');
        return result
    },
    yikupopulateOne: async function(id){
        // 异库： 告诉外建是谁，  并且要将这个model 传过去。 
        let result = await mongoHelper.populateForTwo(articlesModel, {_id:id},{},{},[{path:'class_id',model:text2_classModel}]);
        return result
    },
    aggregate: async function(arr){
        // 异库： 告诉外建是谁，  并且要将这个model 传过去。 
        let result = await mongoHelper.aggregate(articlesModel,arr);
        return result
    },
}