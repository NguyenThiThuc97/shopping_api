const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Schema = mongoose.Schema

const ItemSchema = new Schema({
    id : {
        type : Number,
        unique: true
    },
    name : { // sale with percent of product for redution of money
        type : String, // money or percent
        required : true
    },
    calculation : {
        type : Number,
        required : true
    }

})
ItemSchema.plugin(AutoIncrement, {id : 'SaleIdAuto', inc_field : 'id'})

module.exports = Item = mongoose.model('sales', ItemSchema)