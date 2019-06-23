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
        var cus_id = req.body.id
        var cus_username = req.body.username
        var cus_fullname = req.body.fullname
        var cus_address = req.body.address
        var cus_phone = req.body.phone
        var cus_email = req.body.email
        CustomerModel.findOneAndUpdate({id : cus_id}, {$set : {
            username : cus_username,
            fullname : cus_fullname,
            address : cus_address,
            phone : cus_phone,
            email : cus_email
        }}).then((error, result) => {
            if(error){
                res.json({
                    status : false,
                })
            }
            else {
                res.json({
                    status : true,
                    result : result
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
        if(req.body.new_pwd === req.body.old_pwd){
            util.changePwd(CustomerModel, req).then(result => {
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
                                            res.cookie('access_token', token, {
                                                maxAge: 365 * 24 * 60 * 60 * 100,//life time
                                                httpOnly: true,//only http can read token
                                                //secure: true;//ssl nếu có, nếu chạy localhost thì comment nó lại
                                            })
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
                                    res.cookie('access_token', token, {
                                        maxAge: 365 * 24 * 60 * 60 * 100,//life time
                                        httpOnly: true,//only http can read token
                                        //secure: true;//ssl nếu có, nếu chạy localhost thì comment nó lại
                                    })
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