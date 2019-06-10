const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Product = require('./Product')

const Schema = mongoose.Schema

const ItemSchema = new Schema({
    id : {
        type : Number,
        unique : true
    },
    name : {
        type : String,
        // required : true
    },
    products : {
        type : [Product.schema]
    } 
})
ItemSchema.plugin(AutoIncrement, {id : 'CategoryIdAuto', inc_field : 'id'})

module.exports = Item = mongoose.model('categories', ItemSchema)