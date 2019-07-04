const util = require('./../Utils/OrdersUtil')
const OrdersModel = require('./../Models/Orders')
const CustomerModel = require('./../Models/Customer')
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
            // console.log(customer, products)
            var money = ProductUtil.sumMoney(products)
            if(customer && products){
                var newItem = new OrdersModel({
                    customer : customer,
                    products : products,
                    money : money
                })
                util.create(newItem).then(result => {
                    util.edit(customer.id, newItem).then(result1 => {
                        res.json({result, result1})
                    })
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
        util.editItem(OrdersModel, item).then(result => {
            res.json(result)
        })
    },
    delete: function(req, res){
        util.delete(OrdersModel, req.params.id).then(result => {
            res.json(result)
        })
    },
    getOrdersOfCutomer: function(req, res){
        util.getOrdersOfCustomer(req.params.id).then(result => {
            res.json(result)
        })
    }
};