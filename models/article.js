
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
    }
});
var mongoUtil = mongoHelper.pool(settings.databases.text1.name,settings.databases.text1.config)
const articlesModel = mongoUtil.model('articles',articlesSchema, 'articles');

exports = module.exports = {
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
    }

}