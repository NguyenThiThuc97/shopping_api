const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Sale = require('./Sale')

const Schema = mongoose.Schema

const ItemSchema = new Schema({
    id : {
        type : Number,
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    manufacture_details: {
        type : Object
    },
    details : {
        type : [Object],//contain : size, color, price, quantity,
        default : []
    },
    images : {
        type : [Object]
    },
    price : {
        type : Number,
        required : true
    },
    sale : {
        // type : [Sale.schema]
        type : Sale.schema,
        default : null
    },
	time_import : {
		type : Date,
		default : Date.now,
		required : true
    },
    cate_id:{
        type: Number,
        required : true
    }
})
ItemSchema.plugin(AutoIncrement, {id : 'ProductIdAuto', inc_field : 'id'})

module.exports = Item = mongoose.model('products', ItemSchema)