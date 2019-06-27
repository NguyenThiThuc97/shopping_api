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
        return CategoryModel.updateOne({id : cate_id}, {$pull : {products : {cate_id : cate_id}}}, { multi: true }, function(error, result){
            if(result.ok === 1 && result.n !== 0)
                return ProductModel.findOneAndRemove({'id' : product_id}).then((result1) => {
                    if(result1 === null){
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

    CheckProductDetailAdded(product_id, new_size, new_color){
        var product_id = parseInt(product_id)
        var size = new_size
        var color = new_color
        // return ProductModel.findOne({"id" : product_id},{"details" : {$elemMatch : {"color" : color, "size" : size}}})
        //                     .then(res => {
        //                         if(res.details.length === 0){//not exist => true
        //                             return true
        //                         }
        //                         else{
        //                             return false //exist => false
        //                         }
        //                     })
        return this.getProductDetail(product_id, size, color).then(res => {
            if(res.details.length === 0){//not exist => true
                return true
            }
            else{
                return false //exist => false
            }
        })
    }

    saveProductDetail(req)//object input "product_detail"
    {
        return this.CheckProductDetailAdded(req.body.product_id, req.body.size, req.body.color).then(testInputDataProductDetail => {//
            var product_id = req.body.product_id
            var size = req.body.size
            var color = req.body.color
            var quantity = parseInt(req.body.quantity)
            var price = parseInt(req.body.price)
            if(testInputDataProductDetail){//size and color not existed in db => create
                var new_product_detail = {
                    size : size,
                    color : color,
                    price : price,
                    quantity : quantity,
                    date_received : new Date()
                }

                return ProductModel.findOneAndUpdate({"id" : product_id}, {$push : {"details" : new_product_detail}}, { upsert: true }).then((result, error) => {
                    // if(result.n == 1 && result.nModified == 1 && result.ok == 1)
                    return {message : "create product detail successfull", statusAdd : true, result : new_product_detail}
                })
            }
            else {
                return {message : "Product detail is existed", statusAdd : false}
            }
        })
    }

    getProductDetail(product_id, size, color){
        return ProductModel.findOne({"id" : product_id},{"details" : {$elemMatch : {"color" : color, "size" : size}}})
                            .then(res => {
                                return res
                            })
    }

    sumMoney(products){
        var result = products.reduce(function(sum, item) {
            return sum += item.price
            // set initial value as 0
        }, 0);
        return result - this.getSalePrice(products)
    }
    getSalePrice(products){
        return products.reduce((sum, product) => {
            if(product.sale){
                switch(product.sale.name){
                    case "percent":
                        return sum += product.price * product.sale.calculation/100
                    case "money":
                        return sum += product.sale.calculation
                    default:
                        return sum += 0
                }
            }
            else{
                return sum += 0
            }
        }, 0)
    }
}
module.exports = new ProductUtil()