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
    getOne: function(req, res){
        util.getOne(EmployeeModel, req.params.id).then(result => {
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
            role : req.body.role,
            address : req.body.address,
            phone : req.body.phone,
            email : req.body.email
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
    },
    delete: function(req, res){
        util.delete(EmployeeModel, req.params.id).then(result => {
            res.json(result)
        })
    },
    changePwd: function(req, res){
        if(req.body.new_pwd === req.body.old_pwd){
            util.changePwd(EmployeeModel, req).then(result => {
                if(result){
                    res.json({
                        status : true,
                        result : result
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
                                            // // res.setHeader('Cache-Control', 'private');
                                            // res.cookie('access_token', token, {
                                            //     maxAge: 365 * 24 * 60 * 60 * 100,//life time
                                            //     httpOnly: true,//only http can read token
                                            //     //secure: true;//ssl nếu có, nếu chạy localhost thì comment nó lại
                                            // })
                                            // var username = req.cookies['access_token'];
                                            // console.log(username ? username : "cookie not set")
                                            res.json({
                                                token,
                                                user: {
                                                    id: result.id,
                                                    type:"employee",
                                                    username: result.username,
                                                    email: result.email
                                                }
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
                                        }
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