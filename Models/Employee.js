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
    password : {
        type : String,
        required : true
    },
    role : {
        type : Object,
        required : true
    }
})
ItemSchema.plugin(AutoIncrement, {id : 'EmpIdAuto', inc_field : 'id'})

module.exports = Item = mongoose.model('employees', ItemSchema)