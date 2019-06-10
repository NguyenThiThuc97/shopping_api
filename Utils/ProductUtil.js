const CategoryModel = require('./../Models/Category') 
const Util = require('./Util')
const ProductModel = require('./../Models/Product')

class ProductUtil extends Util {
    edit(id, item){
        return  CategoryModel.findOneAndUpdate({id : id}, {$push : {"products" : item}}, { upsert: true }).then(result => {
            return result
        })
    }

    delete(product_id, cate_id){
        return CategoryModel.update({id : cate_id}, {$pull : {products : {cate_id : cate_id}}}, { multi: true }, function(error, result){
            if(result.ok === 1 && result.n !== 0)
                return ProductModel.findOneAndRemove({'id' : product_id}).then((result) => {
                    if(result === null){
                        return {status : false}
                    }
                    else{
                        return {status : true}
                    }
                })
            else
                return {status : false}
            
        })
        
    }
}
module.exports = new ProductUtil()