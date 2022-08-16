const mongoose = require("mongoose");

const srervicecategoryschemaTwo = new mongoose.Schema({
    categoryNameTwo:{
        type:String,
        required:true
    }
},{timestamps:true})


module.exports = mongoose.model("servicecategorytwo",srervicecategoryschemaTwo)
