const util = require('./../Utils/CustomerUtil')
const CustomerModel = require('./../Models/Customer')

module.exports = 
{
    get: function(req, res){
        util.get(CustomerModel).then(result => {
            res.json(result)
        })
    },
    getOne: function(req, res){
        util.getOne(CustomerModel).then(result => {
            res.json(result)
        })
    },
    create: function(req, res){
        var newItem = new CustomerModel({
            username : req.body.username,
            fullname : req.body.fullname,
            password : util.encryptionPassword(req.body.password),         
        })
        util.create(newItem).then(result => {
            res.json(result)
        })
    },
    edit: function(req, res){
        
    }
};