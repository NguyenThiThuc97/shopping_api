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
                        price : req.body.price,
                        // details : [req.body.details],
                        images : req.file ? [req.file.originalname] : "",
                        sale : input_sale,
                        cate_id: req.body.category,
                        time_import: req.body.time
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
            
        })
    },
    edit: function(req, res){
        // console.log(req.body)
        util.checkExist(CategoryModel, req.body.category).then(checkExist => {
            var sale =  module.exports.getJedisQuery(req.body.sale);
            sale.then(function(input_sale) {
                if(checkExist){
                    var product_id = req.body.id
                    var title = req.body.title
                    var description = req.body.description
                    var manufacture_details_name = req.body.manufacture_details_name
                    var manufacture_details_model = req.body.manufacture_details_model
                    var price = req.body.price
                    var sale = input_sale
                    var cate_id = req.body.category
                    var time = req.body.time
                    var images = req.file
                    var imagesN = ""
                    if(images){
                        imagesN = images.originalname
                    }
                    if(imagesN.length !== 0){
                        var newItem = {
                            title : title,
                            description : description,
                            images : [imagesN],
                            manufacture_details : {
                                name : manufacture_details_name,
                                model : manufacture_details_model
                            },
                            price : price,
                            sale : sale,
                            cate_id : cate_id
                        }
                        return ProductModel.findOneAndUpdate({id:product_id}, newItem).then((result, error) => {
                            if(error){
                                res.json({status : false})
                            }
                            else{
                                return ProductModel.findOne({id : result.id}).then(resss => {
                                    var cate_id = resss.cate_id
                                    return CategoryModel.findOneAndUpdate(
                                        {id : cate_id, 'products.id' : resss.id}, 
                                        {$set : {"products.$" : resss}}, { upsert: true }).then((result1, error1) => {
                                        // console.log(result1)
                                        res.json({status : true, result : resss})
                                    })
                                })
                            }
                        })
                    }
                    else{
                        var newItem = {
                            title : title,
                            description : description,
                            // time_import : time,
                            manufacture_details : {
                                name : manufacture_details_name,
                                model : manufacture_details_model
                            },
                            price : price,
                            sale : sale,
                            cate_id : cate_id
                        }
                        return ProductModel.findOneAndUpdate({id:product_id}, newItem).then((result, error) => {
                            if(error){
                                res.json({status : false})
                            }
                            else{
                                // console.log(result)
                                return ProductModel.findOne({id : result.id}).then(resss => {
                                    var cate_id = resss.cate_id
                                    return CategoryModel.findOneAndUpdate(
                                        {id : cate_id, 'products.id' : resss.id}, 
                                        {$set : {"products.$" : resss}}, { upsert: true }).then((result1, error1) => {
                                        res.json({status : true, result : resss})
                                    })
                                })
                            }
                        })
                    }
                }
                else{
                    res.json({status : false})
                }
            })
        })
        
    },
    delete: function(req, res){
        var product_id = parseInt(req.params.id) 
        ProductModel.findOne({id:product_id}).select("cate_id").then(cate_id => {
            if(cate_id !== null){
                util.delete(product_id, cate_id.cate_id).then(result => {
                    // console.log(result)
                    res.json({result : result, status : true})
                })
            }
            else{
                res.json({status : false})
            }
        })
        
    },
    addProductDetail: function(req, res){
       util.saveProductDetail(req).then(result => {
           if(result.statusAdd){
                res.json({status : true, msg : result.message, details : result.result})
           }
           else{
               res.json({status : false, msg : result.message})
           }
       })
    },
    getAllProductDetail: function(req, res){
        var product_id = req.params.id
        ProductModel.findOne({id : product_id}).then(result => {
            res.json({details : result.details})
        })
    },
    deleteProductDetail: function(req, res){
        var product_id = req.params.id
        var size = req.params.size
        var color = req.params.color
        ProductModel.findOneAndUpdate({id : product_id}, {"$pull":{"details":{"color":color, "size":size}}}, { multi: true }, function(err, result)
        {
            if(err){
                res.json({status : false})
            }
            else{
                res.json({status : true})
            }
            
        })
    },
    getProductDetail: function(req, res){
        var product_id = req.params.id
        var color = req.params.color
        var size = req.params.size
        util.getProductDetail(product_id, size, color).then(result => {
            res.json(result.details[0])
        })
    },
    updateProductDetail: function(req, res){
        var item_detail = req.body
        console.log(item_detail)
        var product_id = item_detail.product_id
        var size = item_detail.size
        var old_size = item_detail.old_size
        var color = item_detail.color
        var old_color = item_detail.old_color
        var quantity = parseInt(item_detail.quantity)
        var price = item_detail.price
        //when not update size and color
        if(old_color === color && old_size === size){
            ProductModel.findOneAndUpdate({
                id : product_id, 
                details : {
                    $elemMatch : {
                        size : old_size, 
                        color : old_color
                    }
                }
            },
            {$set : {
                'details.$.quantity' : quantity,
                'details.$.price' : price
            }},
            {upsert : true}).then((update_product, error) => {
                if(error){
                    res.json({status : false})
                }
                else{
                    ProductModel.findOne({id : product_id}).then((detail_result, err) => {
                        if(err){
                            res.json({status : false})
                        }
                        else{
                            res.json({status :true, result : detail_result.details})
                        }
                    })
                }
            })
        }
        //when update size and color
        else{
            ProductModel.findOne({id : product_id, details : {$elemMatch : {size : size, color : color}}}).then(find_product_detail => {
                if(find_product_detail){
                    res.json({status : false})
                }
                else {
                    ProductModel.findOneAndUpdate({
                        id : product_id, 
                        details : {
                            $elemMatch : {
                                size : old_size, 
                                color : old_color
                            }
                        }
                    },
                    {$set : {
                        'details.$.size' : size, 
                        'details.$.color': color,
                        'details.$.quantity' : quantity,
                        'details.$.price' : price
                    }},
                    {upsert : true}).then((update_product, error) => {
                        if(error){
                            res.json({status : false})
                        }
                        else{
                            ProductModel.findOne({id : product_id}).then((detail_result, err) => {
                                if(err){
                                    res.json({status : false})
                                }
                                else{
                                    res.json({status :true, result : detail_result.details})
                                }
                            })
                        }
                    })
                }
            })
        }
    },
    sumMoney : function(req, res){
        res.json(util.sumMoney(req.body))//products list
    },
    findSale: function(req, res){
        ProductModel.find({$where : function(){
            return this.sale !=null
        }}).sort({time_import : 'desc'}).then(result => {
            res.json(result)
        })
    },
    findArrival: function(req, res){
        ProductModel.find().sort({time_import : "desc"}).then(result => {
            res.json(result)
        })
    }
};