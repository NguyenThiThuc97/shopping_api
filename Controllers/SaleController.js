const util = require('./../Utils/SaleUtil')
const SaleModel = require('./../Models/Sale')

module.exports = 
{
    get: function(req, res){
        util.get(SaleModel).then(result => {
            res.json(result)
        })
    },
    getOne: function(req, res){
        util.getOne(SaleModel, req.params.id).then(result => {
            res.json(result)
        })
    },
    create: function(req, res){
        if(req.body.name){
            var newItem = new SaleModel({
                name : req.body.name,
                calculation : req.body.calculation
            })
            util.create(newItem).then(result => {
                res.json(result)
            })
        }
        else{
            res.json("Cannot save!")
        }
        
    },
    edit: function(req, res){
        var id = req.body.id
        var name = req.body.name
        var calculation = parseInt(req.body.calculation) 
        var item = {
            id,name,calculation
        }
        util.editItem(SaleModel, item).then(result => {
            res.json(result)
        })
    },
    delete: function(req, res){
        util.delete(SaleModel, req.params.id).then(result => {
            res.json(result)
        })
    }
};