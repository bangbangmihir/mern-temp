const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true, 
    },
    LastName:{
        type:String,
        required:true,
    },
    UserName:{
        type:String,
        required:true, 
    },
    Email:{
        type:String,
        required:true,
    },
    Number:{
        type:Number,
        maxLength: 10
    },
    Password:{
        type:String,
        required:true,
    },
    userImage:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    } 
},{timestamps:true})

module.exports = mongoose.model("User",userSchema);