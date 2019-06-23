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
        util.getOne(CategoryModel, req.params.id).then(result => {
            res.json(result)
        })
    },
    create: function(req, res){
        if(req.body.name){
            var newItem = new CategoryModel({
                name : req.body.name         
            })
            util.create(newItem).then(result => {
                res.json(result)
            })
        }
        else{
            res.json("Name is required!")
        }
        
    },
    edit: function(req, res){
        var id = req.body.id
        var name = req.body.name
        var item = {
            id,name
        }
        util.editItem(CategoryModel, item).then(result => {
            if(result.status === true){
                CategoryModel.findOne({id : item.id}).then(results => {
                    res.json({status : true, result : results})
                })
            }
            else {
                res.json(result)
            }
        })
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