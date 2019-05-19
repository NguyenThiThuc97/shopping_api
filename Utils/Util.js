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
            return result["id"]
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
}