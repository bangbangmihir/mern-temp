const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    AuthorName:{
        type:String,
        required:true
    },
    Review:{
        type:String,
        required:true
    },
    AuthorImage:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("Review",reviewSchema)