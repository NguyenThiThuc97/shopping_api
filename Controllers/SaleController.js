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
        var newItem = new SaleModel({
            name : req.body.name,
            calculation : req.body.calculation
        })
        util.create(newItem).then(result => {
            res.json(result)
        })
    },
    edit: function(req, res){
        
    },
    delete: function(req, res){
        util.delete(SaleModel, req.params.id).then(result => {
            res.json(result)
        })
    }
};