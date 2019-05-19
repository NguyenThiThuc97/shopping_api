const CategoryModel = require('./../Models/Category') 
const Util = require('./Util')

class ProductUtil extends Util {
    edit(id, item){
        return  CategoryModel.findOneAndUpdate({id : id}, {$push : {"products" : item}}, { upsert: true }).then(result => {
            return result
        })
    }
}
module.exports = new ProductUtil()