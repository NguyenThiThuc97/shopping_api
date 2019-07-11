const util = require('./../Utils/CustomerUtil')
const CustomerModel = require('./../Models/Customer')
const jwt = require('jsonwebtoken');
const config = require('./../config/constant');

module.exports = 
{
    get: function(req, res){
        util.get(CustomerModel).then(result => {
            res.json(result)
        })
    },
    getOne: function(req, res){
        util.getOne(CustomerModel, req.params.id).then(result => {
            res.json(result)
        })
    },
    getProfile: function(req, res){
        var id = parseInt(jwt.verify(req.params.id, 'sl_myJwtSecret').id)
        util.getOne(CustomerModel, id).then(result => {
            res.json(result)
        })
    },
    create: function(req, res){
        if(req.body.password === req.body.confirm_password){
            var newItem = new CustomerModel({
                username : req.body.username,
                fullname : req.body.fullname,
                address : req.body.address,
                phone : req.body.phone,
                email : req.body.email,
                password : util.encryptionPassword(req.body.password),         
            })
            util.create(newItem).then(result => {
                res.json(result)
            })
        }
        else{
            res.json("Error!")
        }
    },
    edit: function(req, res){
        var cus_id = parseInt(jwt.verify(req.body.id, 'sl_myJwtSecret').id)
        var cus_fullname = req.body.fullname
        var cus_address = req.body.address
        var cus_phone = req.body.phone
        var cus_email = req.body.email

        CustomerModel.findOneAndUpdate(
            {id : cus_id}, 
            {$set : {
                    fullname : cus_fullname,
                    email : cus_email,
                    phone : cus_phone,
                    address : cus_address
                }
            }).then((result, error) => {
            if(error) {
                res.json({status : false})
            }
            else{
                CustomerModel.findOne({id: cus_id}).then(get_cus  => {
                    res.json({status : true, result : get_cus})
                })
            }
        })
    },
    delete: function(req, res){
        util.delete(CustomerModel, req.params.id).then(result => {
            res.json(result)
        })
    },
    changePwd: function(req, res){
        var item = req.body

        var id = item.id
        var new_password = item.new_password
        var confirm_new_password = item.confirm_new_password
        var old_password = item.old_password

        var cus_id = parseInt(jwt.verify(id, 'sl_myJwtSecret').id)

        if(confirm_new_password === new_password){
            util.changePwd(CustomerModel, cus_id, new_password, old_password).then(result => {
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
        CustomerModel.findOne({username : req.body.username}).then(result1 => {
            if(!result1){//login with email
                CustomerModel.findOne({email : req.body.username}).then(result2 => {
                    if(result2){
                        util.login(CustomerModel, result2.id, req.body.password).then(result => {
                            if(result){
                                jwt.sign(
                                    { id: result.id },
                                    config.jwtSecret,
                                    { expiresIn: 3600 },
                                    (err, token) => {
                                        if(err) 
                                            return  null;
                                        else {
                                            // res.cookie('access_token', token, {
                                            //     maxAge: 365 * 24 * 60 * 60 * 100,//life time
                                            //     httpOnly: true,//only http can read token
                                            //     //secure: true;//ssl nếu có, nếu chạy localhost thì comment nó lại
                                            // })
                                            res.json({
                                                token,
                                                user: {
                                                    id: result.id,
                                                    type:"customer",
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
                util.login(CustomerModel, result1.id, req.body.password).then(result => {
                    if(result){
                        jwt.sign(
                            { id: result.id },
                            config.jwtSecret,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) 
                                    return  null;
                                else {
                                    // res.cookie('access_token', token, {
                                    //     maxAge: 365 * 24 * 60 * 60 * 100,//life time
                                    //     httpOnly: true,//only http can read token
                                    //     //secure: true;//ssl nếu có, nếu chạy localhost thì comment nó lại
                                    // })
                                    res.json({
                                        token,
                                        user: {
                                            id: result.id,
                                            type:"customer",
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