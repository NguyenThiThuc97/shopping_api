
const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    id : {
        type : Number,
        unique : true
    },
    username : {
        type : String,
        required : true
    },
    fullname : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    image : {
        type : String,
    },
    password: {
        type : String,
        required : true
    },
    // orders : {
    //     type : [Object],
    //     default : []
    // }
})
ItemSchema.plugin(AutoIncrement, {id : 'CustomerIdAuto', inc_field : 'id'})

module.exports = Item = mongoose.model('customers', ItemSchema)