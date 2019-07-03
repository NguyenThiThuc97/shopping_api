const util = require('./../Utils/SaleUtil')
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
        var customer_id = req.body.customer
        // Verify token
        // const decoded = jwt.verify(token, config.get('jwtSecret'));
        const decoded_token = jwt.verify(customer_id, 'sl_myJwtSecret');
        var customer = CustomerModel.findOne({id : parseInt(decoded_token.id)}).then(customer => {return customer})
        var products = req.body.products
        // console.log(customer, products)
        var money = ProductUtil.sumMoney(products)
        if(customer && products){
            // var newItem = new OrdersModel({
            //     customer : customer,
            //     products : products,
            //     money : money
            // })
            // console.log(newItem)
            // util.create(newItem).then(result => {
            //     res.json(result)
            // })
            console.log(customer,products)
            res.json("aaa")
        }
        else{
            res.json("Cannot save!")
        }
    },
    edit: function(req, res){
        var status = req.body.status
        var item = {
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
    }
};