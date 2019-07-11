const CustomerModel = require('./../Models/Customer')
const OrdersModel = require('./../Models/Orders')
const Util = require('./Util')

class OrdersUtil extends Util {
    edit(id, item){
        return  CustomerModel.findOneAndUpdate({id : id}, {$push : {"orders" : item}}, { upsert: true }).then(result => {
            return item
        })
    }
    getOrdersOfCustomer(customer_id){
        return CustomerModel.findOne({id : customer_id}).then(cus_result => {
            return OrdersModel.find({"customer.username" : cus_result.username})
                            .then(res => {
                                return res
                            })
        })
        
    }
}
module.exports = new OrdersUtil()