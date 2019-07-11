const util = require('./../Utils/OrdersUtil')
const OrdersModel = require('./../Models/Orders')
const CustomerModel = require('./../Models/Customer')
const ProductModel = require('./../Models/Product')
const ProductUtil = require('./../Utils/ProductUtil')
const jwt = require('jsonwebtoken');

module.exports = 
{
    get: function(req, res){
        util.get(OrdersModel).then(result => {
            res.json(result)
        })
    },
    getOne: function(req, res){
        util.getOne(OrdersModel, req.params.id).then(result => {
            res.json(result)
        })
    },
    create: function(req, res){
        CustomerModel.findOne({id : parseInt(jwt.verify(req.body.customer, 'sl_myJwtSecret').id)}).then(customer => {
            var products = req.body.products
            var money = ProductUtil.sumMoney(products)
            if(customer && products){
                var newItem = new OrdersModel({
                    customer : customer,
                    products : products,
                    money : money
                })
                util.create(newItem).then((result, err) => {//create orders
                    if(err){
                        console.log("err", err)
                        res.json(err)
                    }
                    else{
                        // console.log("success")
                        Promise.all(products.map(product => {
                            return Promise.all(product.details.map(product_detail => {
                                // console.log(product.product.id, product_detail.size, product_detail.color)
                                
                                return ProductModel.findOneAndUpdate(
                                    {
                                        "id" : product.product.id, 
                                        "details" : {
                                            $elemMatch : {
                                                "color" : product_detail.color, 
                                                "size" : product_detail.size
                                            }
                                        }
                                    },
                                    {$inc : {'details.$.quantity': - parseInt(product_detail.quantity)}},
                                    { upsert: true }
                                    )
                                                    .then(product_detail_update => {return product_detail_update})
                                // ProductModel.findOne(
                                //     {id : product.id, details:{$elemMatch : 
                                //         {size : product_detail.size, color : product_detail.color}}
                                //     })
                            })).then(product_detail_update_a => {return product_detail_update_a})
                        })).then((resultsss, err) => {
                            if(err){
                                res.json({error : err, status : false})
                            }
                            else { 
                                res.json({status : true})
                            }
                            // console.log(resultsss)
                        })
                    }
                    
                })
            }
            else{
                res.json("Cannot save!")
            }
        })
        
    },
    edit: function(req, res){
        var id = req.body.id
        var status = req.body.status
        var item = {
            id,
            status
        }
        util.editItem(OrdersModel, item).then(result1 => {
            OrdersModel.findOne({id : id}).then(result => {
                res.json(result)
            })
        })
    },
    delete: function(req, res){
        util.delete(OrdersModel, req.params.id).then(result => {
            res.json(result)
        })
    },
    getOrdersOfCutomer: function(req, res){
        var customer_id = parseInt(jwt.verify(req.params.id, 'sl_myJwtSecret').id)
        util.getOrdersOfCustomer(customer_id).then(result => {
            res.json(result)
        })
    }
};