const crypto = require('crypto')
// const bcrypt = require('bcryptjs');
// const config = require('./../config');
// const jwt = require('jsonwebtoken');
// const auth = require('./../middleware/auth');

module.exports = class Util {
    constructor(){
    }
    get(model){
        return model.find().then(result => {
            return result
        })
    }
    getOne(model, id){
        return model.findOne({id : id}).then(result => {
            return result
        })
    }
    create(NewItem){
        return NewItem.save().then(result => {
            return result
        })
    }
    editItem(Model, item){
        return Model.findOne({id : item.id}).then(check_exist => {
            if(check_exist){
                return Model.findOneAndUpdate({id : item.id}, item).then((result, error) => {
                    if(error){
                        return {status : false}
                    }
                    else{
                        return {status : true, result : item}
                    }
                })
            }
            return {status : false}
        })
        
    }
    encryptionPassword(text){
        return crypto.createHmac('sha256', text).update('graduationuit2015').digest('hex')
    }
    checkExist(Model, id){
        return Model.find({id : id}).then(result => {
            return result.length !== 0 ? true : false
        })
    }
    delete(Model, id){
        return Model.findOneAndRemove({'id' : id}).then((result) => {
            // console.log(result)
            if(result === null){
                return {status : false}
            }
            else{
                return {status : true, result : result}
            }
        })
    }
    changePwd(Model, id, new_password, old_password){//password have not encrypt yet
        return Model.findOne({id : id}).then(result => {
            if(this.encryptionPassword(old_password) === result.password){
                return Model.findOneAndUpdate({id : id}, {$set : {password : this.encryptionPassword(new_password)}}).then(result => {
                    return result
                })
            }
            else{
                return false
            }
        })
    }

    login(Model, id, password){
        return Model.findOne({id : id, password : this.encryptionPassword(password)}).then(result => {
            return result
        })
    }
    findUserWithUsernameOrId(Model, username, type = "username"){
        if(type === "username"){
            return Model.find({username : username}).then(res => {
                return result
            })
        }
        else if(type === "id"){
            return Model.find({id : username}).then(res => {
                return result
            })
        }
    }
}