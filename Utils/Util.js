const CategoryModel  = require('./../Models/Category')
const CustomerModel  = require('./../Models/Customer')
const EmployeeModel  = require('./../Models/Employee')
const OrdersModel  = require('./../Models/Orders')
const ProductModel  = require('./../Models/Product')
const SaleModel  = require('./../Models/Sale')

const crypto = require('crypto')

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
            console.log(result)
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
}