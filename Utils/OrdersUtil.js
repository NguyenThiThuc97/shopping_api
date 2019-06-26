const OrderModel = require('./../Models/Orders') 
const Util = require('./Util')

class OrdersUtil extends Util {
    // get(id, item){
    //     return  CategoryModel.findOneAndUpdate({id : id}, {$push : {"products" : item}}, { upsert: true }).then(result => {
    //         return result
    //     })
    // }
}
module.exports = new OrdersUtil()