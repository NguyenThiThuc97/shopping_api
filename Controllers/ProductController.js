const util = require('./../Utils/ProductUtil')
const ProductModel = require('./../Models/Product')
const CategoryModel = require('./../Models/Category')
const Transaction = require('mongoose-transactions')
const transaction = new Transaction()

module.exports = 
{
    get: function(req, res){
        util.get(ProductModel).then(result => {
            res.json(result)
        })
    },
    getOne: function(req, res){
        util.getOne(ProductModel).then(result => {
            res.json(result)
        })
    },
    create: function(req, res){
        util.checkExist(CategoryModel, req.body.category).then(checkExist => {
            if(checkExist){
                var newItem = new ProductModel({
                    title : req.body.title,
                    description : req.body.description,
                    manufacture_details : req.body.manufacture_details,
                    details : req.body.details,
                    images : req.body.images,
                    sale : req.body.sale         
                })
                util.create(newItem).then(result => {
                    util.edit(req.body.category, newItem).then(result_cate =>{
                        res.json({result, result_cate})
                    })
                })
            }
            else{
                res.json("Cannot import!!!")
            }
        })
    },
    edit: function(req, res){
        
    }
};