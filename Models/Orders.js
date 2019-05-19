const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Customer = require('./Customer')
const Product = require('./Product')

const Schema = mongoose.Schema

const ItemSchema = new Schema({
    id : {
        type : Number,
        unique : true
    },
    time : {
        type : Date,
        default : Date.now
    },
    customer : {
        type : [Customer.schema],
        required : true
    },
    products : {
        type : [Product.schema],
        required : true
    }
})
ItemSchema.plugin(AutoIncrement, {id : 'OrdersIdAuto', inc_field : 'id'})

module.exports = Item = mongoose.model('orders', ItemSchema)