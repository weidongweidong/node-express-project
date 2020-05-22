
const mongoHelper = require('../utils/mongoHelper');
const mongoose = require('mongoose');
const settings = require(`../conf/${process.env.NODE_ENV}/settings`);

const classSchema = new mongoose.Schema({
    name: { 
        type: String
    },
});
var mongoUtil = mongoHelper.pool(settings.databases.text1.name,settings.databases.text1.config)
const classModel = mongoUtil.model('class',classSchema, 'class');

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
        let data = await classModel.find(query, null, options).skip((page-1) * limit).limit(limit);
        return data;
    },
    findById: async function(id){
        let result = await mongoHelper.findOne(classModel, {_id:id});
        return result
    },
    insert: async function(model){
        let obj = new classModel(model);
        let result =  await mongoHelper.insert(obj);
        return result;
    },
    update: async function(id,query){
        let result = await classModel.update({_id:id},query);
        return result;
    },
    delete: async function(id){
        let result = await classModel.deleteOne({_id:id});
        return result;
    },
    populateOne: async function(id){
        let result = await mongoHelper.populateOne(classModel, {_id:id});
        return result
    },
}