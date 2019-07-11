const util = require('./../Utils/EmployeeUtil')
const EmployeeModel = require('./../Models/Employee')
const jwt = require('jsonwebtoken');
const config = require('./../config/constant');

module.exports = 
{
    get: function(req, res){
        util.get(EmployeeModel).then(result => {
            res.json(result)
        })
    },
    getProfile: function(req, res){
        var id = parseInt(jwt.verify(req.params.id, 'sl_myJwtSecret').id)
        util.getOne(EmployeeModel, id).then(result => {
            res.json(result)
        })
    },
    getOne: function(req, res){
        util.getOne(EmployeeModel, req.params.id).then(result => {
            res.json(result)
        })
    },
    create: function(req, res){
        var newItem = new EmployeeModel({
            username : req.body.username,
            fullname : req.body.fullname,
            image : req.file ? req.file.originalname : "",
            password : util.encryptionPassword(req.body.password),
            role : req.body.role,
            address : req.body.address,
            phone : req.body.phone,
            email : req.body.email
        })
        util.checkAlias(username).then(result_check => {
            if(result_check){
                util.create(newItem).then(result => {
                    res.json({result:result, status : true})
                })
            }
            else{
                res.json({status : "Username is used!", status : false})
            }
        })
    },
    edit: function(req, res){
        var item_edit = req.body
        
        var emp_id = parseInt(jwt.verify(item_edit.id, 'sl_myJwtSecret').id)
        var emp_fullname = item_edit.fullname
        var emp_email = item_edit.email
        var emp_phone = item_edit.phone
        var emp_address = item_edit.address

        EmployeeModel.findOneAndUpdate(
            {id : emp_id}, 
            {$set : {
                    fullname : emp_fullname,
                    email : emp_email,
                    phone : emp_phone,
                    address : emp_address
                }
            }).then((result, error) => {
            if(error) {
                res.json({status : false})
            }
            else{
                EmployeeModel.findOne({id: emp_id}).then(get_emp  => {
                    res.json({status : true, result : get_emp})
                })
            }
        })
    },
    delete: function(req, res){
        util.delete(EmployeeModel, req.params.id).then(result => {
            res.json(result)
        })
    },
    changePwd: function(req, res){
        var item = req.body

        var id = item.id
        var new_password = item.new_password
        var confirm_new_password = item.confirm_new_password
        var old_password = item.old_password

        var emp_id = parseInt(jwt.verify(id, 'sl_myJwtSecret').id)

        if(confirm_new_password === new_password){
            util.changePwd(EmployeeModel, emp_id, new_password, old_password).then(result => {
                if(result){
                    res.json({
                        status : true,
                    })
                }
                else{
                    res.json({
                        status : false,
                    })
                }
            })
        }
        else{
            res.json({
                status : false,
            })
        }
    },

    login: function(req, res){
        EmployeeModel.findOne({username : req.body.username}).then(result1 => {
            if(!result1){//login with email
                EmployeeModel.findOne({email : req.body.username}).then(result2 => {
                    if(result2){
                        util.login(EmployeeModel, result2.id, req.body.password).then(result => {
                            if(result){
                                jwt.sign(
                                    { id: result.id },
                                    config.jwtSecret,
                                    { expiresIn: 3600 },
                                    (err, token) => {
                                        if(err) 
                                            return  null;
                                        else {
                                            res.json({
                                                token,
                                                user: {
                                                    id: result.id,
                                                    type:"employee",
                                                    username: result.username,
                                                    email: result.email
                                                },
                                                role : result.role
                                            })
                                        }
                                    }
                                )
                            }
                            else{
                                res.json({msg : "error"})
                            }
                        })
                    }
                    else{
                        res.json({msg : "error"})
                    }
                })
            }
            else{//login with username
                util.login(EmployeeModel, result1.id, req.body.password).then(result => {
                    if(result){
                        jwt.sign(
                            { id: result.id },
                            config.jwtSecret,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) 
                                    return  null;
                                else {
                                    // // res.setHeader('Cache-Control', 'private');
                                    // res.cookie('access_token', token, {
                                    //     maxAge: 365 * 24 * 60 * 60 * 100,//life time
                                    //     httpOnly: true,//only http can read token
                                    //     //secure: true;//ssl nếu có, nếu chạy localhost thì comment nó lại
                                    // })
                                    res.json({
                                        token,
                                        user: {
                                            id: result.id,
                                            type:"employee",
                                            username: result.username,
                                            email: result.email
                                        },
                                        role : result.role
                                    })
                                }
                            }
                        )
                    }
                    else{
                        res.json({msg : "error"})
                    }
                })
            }
        })
    }
};