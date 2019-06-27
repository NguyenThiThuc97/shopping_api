const util = require('./../Utils/SaleUtil')
const OrdersModel = require('./../Models/Orders')
const ProductUtil = require('./../Utils/ProductUtil')

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
        var customer = req.body.customer
        var products = req.body.products
        // console.log(customer, products)
        var money = ProductUtil.sumMoney(products)
        if(customer && products){
            var newItem = new OrdersModel({
                customer : customer,
                products : products,
                money : money
            })
            console.log(newItem)
            util.create(newItem).then(result => {
                res.json(result)
            })
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