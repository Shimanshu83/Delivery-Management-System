const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name : {type : String, required: true},
    uri : {type : String , required : true , unique : true} ,
    amount : {type : String , required : true} ,
    assignedTo : {type : String} ,
    status : {type : String , default : 'confirm'} 
},{timestamps : true })

module.exports = mongoose.model('Orders' , orderSchema); 