const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String, required : true
    },
    
    email : {
        type : String, required : true , unique : true
    },

    role : {
        type : String , required : true , default : 'User'
    },
    assignOrder : {
        required : false,
        type : [String]
    }, 
    password : {
        type : String, required : true 
    },
    
},{timestamps : true })

module.exports = mongoose.model('User' , userSchema); 