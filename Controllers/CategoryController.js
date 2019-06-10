const util = require('./../Utils/CategoryUtil')
const CategoryModel = require('./../Models/Category')

module.exports = 
{
    get: function(req, res){
        util.get(CategoryModel).then(result => {
            res.json(result)
        })
    },
    getOne: function(req, res){
        util.getOne(CategoryModel).then(result => {
            res.json(result)
        })
    },
    create: function(req, res){
        var newItem = new CategoryModel({
            name : req.body.name         
        })
        util.create(newItem).then(result => {
            res.json(result)
        })
    },
    edit: function(req, res){
        
    },
    checkProductExistInCategory: function(category_id){
        return CategoryModel.findOne({id : category_id}).then(result => {
            if(result){//>0 => cannot delete ; == 0: can delete
                return result.products.length > 0 ? {status : false, cmt : "This category contants product(s)!"} : {status : true}
            }
            return {status : false, cmt : "Category is not existed!"}
        })
    },
    delete: function(req, res){
        return module.exports.checkProductExistInCategory(req.params.id).then(result => {
            if(result.status){
                util.delete(CategoryModel, req.params.id).then(result => {
                    res.json({status : true, msg : result})
                })
            }
            else{
                res.json({status : false})
            }
            
        })
        
    }
};