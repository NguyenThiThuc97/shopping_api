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
    },
    status : {
        type: {},//when orders bill => status = {id:1, name: "Cho thanh toan"}.
                //when update status = {id : 2, name : "da thanh toan"} or status = {id : 3, "Huy don hang"} || cho xac nhan huy don hang
        required : true
    },
    money : {
        type: Number,
        required : true
    }
})
ItemSchema.plugin(AutoIncrement, {id : 'OrdersIdAuto', inc_field : 'id'})

module.exports = Item = mongoose.model('orders', ItemSchema)