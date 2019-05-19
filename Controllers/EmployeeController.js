const util = require('./../Utils/EmployeeUtil')
const EmployeeModel = require('./../Models/Employee')

module.exports = 
{
    get: function(req, res){
        util.get(EmployeeModel).then(result => {
            res.json(result)
        })
    },
    getOne: function(req, res){
        util.getOne(EmployeeModel).then(result => {
            res.json(result)
        })
    },
    create: function(req, res){
        var newItem = new EmployeeModel({
            username : req.body.username,
            fullname : req.body.fullname,
            password : util.encryptionPassword(req.body.password),
            role : req.body.role
        })
        util.create(newItem).then(result => {
            res.json(result)
        })
    },
    edit: function(req, res){
        
    }
};