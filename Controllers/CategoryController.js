const util = require('./../Utils/CategoryUtil')
const CategoryModel = require('./../Models/Category')

module.exports = 
{
    get: function(req, res){
        util.get(CategoryModel).then(result => {
            res.json(result)
        })
    },
    getOne: function(req, res){
        util.getOne(CategoryModel).then(result => {
            res.json(result)
        })
    },
    create: function(req, res){
        var newItem = new CategoryModel({
            name : req.body.name         
        })
        util.create(newItem).then(result => {
            res.json(result)
        })
    },
    edit: function(req, res){
        
    }
};