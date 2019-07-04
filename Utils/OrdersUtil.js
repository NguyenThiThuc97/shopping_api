const CustomerModel = require('./../Models/Customer')
const Util = require('./Util')

class OrdersUtil extends Util {
    edit(id, item){
        return  CustomerModel.findOneAndUpdate({id : id}, {$push : {"orders" : item}}, { upsert: true }).then(result => {
            return result
        })
    }
    getOrdersOfCustomer(customer_id){
        return CustomerModel.find({id : customer_id}).then(result => {
            return result.orders
        })
    }
}
module.exports = new OrdersUtil()