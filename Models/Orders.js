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
        type : Customer.schema,
        // type : Number,
        required : true
    },
    products : {
        type : [Object],
        /*
        [
            {
                product : [Product.Schema],
                details : [
                    {
                        size : "",
                        color : "",
                        quantity : 0,
                        price : 0
                    },
                    ...
                ]
            },
            ...
        ]
        */
        required : true
    },
    status : {
        type: {},/*when orders bill => status = {id : 1, name : "waiting for confirm"}.
                [
                    {id : 2, status : "Confirmed"},
                    {id : 3, status : "Shipping"},
                    {id : 4, status : "Finish"},
                    {id : 5, status : "Canceled (Customer)"},
                    {id : 6, status : "Canceled (Shop)"}
                ]
                */
        required : true,
        default : {
            id : 1,
            name : "waiting confirm"
        }
    },
    money : {
        type: Number,
        required : true
    }
})
ItemSchema.plugin(AutoIncrement, {id : 'OrdersIdAuto', inc_field : 'id'})

module.exports = Item = mongoose.model('orders', ItemSchema)