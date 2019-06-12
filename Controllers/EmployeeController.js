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
        console.log("create emloyee")
        var newItem = new EmployeeModel({
            username : req.body.username,
            fullname : req.body.fullname,
            image : req.file ? req.file.originalname : "",
            password : util.encryptionPassword(req.body.password),
            role : req.body.role
        })
        util.create(newItem).then(result => {
            res.json(result)
        })
    },
    edit: function(req, res){
        var item_edit = req.body
        var emp_id = item_edit.id
        var emp_usrname = item_edit.username
        var emp_fullname = item_edit.fullname
        var emp_role = item_edit.role
        EmployeeModel.findOneAndUpdate({id : emp_id}, {$set : 
                                                                {username : emp_usrname,
                                                                fullname : emp_fullname,
                                                                emp_role : emp_role}
                                                        }).then(result => {
            res.json(result)
        })
    }
};