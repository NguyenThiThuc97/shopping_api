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
        type : Object,//contain : size, color, price, quantity
    },
    images : {
        type : [Object]
    },
    sale : {
        type : [Sale.schema]
    },
	time : {
		type : Date,
		default : Date.now,
		required : true
	}
})
ItemSchema.plugin(AutoIncrement, {id : 'ProductIdAuto', inc_field : 'id'})

module.exports = Item = mongoose.model('products', ItemSchema)