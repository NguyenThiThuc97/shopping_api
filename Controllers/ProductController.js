const util = require('./../Utils/ProductUtil')
const ProductModel = require('./../Models/Product')
const CategoryModel = require('./../Models/Category')
const SaleModel = require('./../Models/Sale')
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
        util.getOne(ProductModel, req.params.id).then(result => {
            res.json(result)
        })
    },
    getJedisQuery: function(id){
        var value = SaleModel.findOne({id:id}).exec();
        return value;
    },
    create: function(req, res){
        util.checkExist(CategoryModel, req.body.category).then(checkExist => {
            var sale =  module.exports.getJedisQuery(req.body.sale);     
            sale.then(function(input_sale) {   
                if(checkExist){
                    var newItem = new ProductModel({
                        title : req.body.title,
                        description : req.body.description,
                        manufacture_details : {
                            name : req.body.manufacture_details_name,
                            model : req.body.manufacture_details_model
                        },
                        details : [req.body.details],
                        images : req.file ? req.file.originalname : "",
                        sale : input_sale,
                        cate_id: req.body.category,
                        time: req.body.time
                    })
                    util.create(newItem).then(result => {
                        util.edit(req.body.category, newItem).then(result_cate =>{
                            console.log("success")
                            res.json({result, result_cate})
                        })
                    })
                }
                else{
                    res.json("Cannot import!!!")
                }
            })  
            
        })
    },
    edit: function(req, res){
        var product_id = req.body.id
        var title = req.body.title
        var description = req.body.description
        var manufacture_details_name = req.body.manufacture_details_name
        var manufacture_details_model = req.body.manufacture_details_model
        var sale = input_sale
        var cate_id = req.body.category
        var time = req.body.time
        var images = req.file
        var imagesN = ""
        if(images){
            imagesN = images.originalname
        }
        // return ProductModel.findOneAndUpdate({id:product_id}, {$set:{
        //                                                                 title : title,
        //                                                                 description : description,
        //                                                                 time : time,
        //                                                                 images : imagesN
        // })
    },
    delete: function(req, res){
        var product_id = parseInt(req.params.id) 
        ProductModel.findOne({id:product_id}).select("cate_id").then(cate_id => {
            if(cate_id !== null){
                util.delete(product_id, cate_id.cate_id).then(result => {
                    res.json(result)
                })
            }
            else{
                res.json({status : false})
            }
        })
        
    }
};