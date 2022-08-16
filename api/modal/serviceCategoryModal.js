const mongoose = require("mongoose");

const servicecategorySchema = new mongoose.Schema({
    categoryName: {
        type:String,
        required:true,
    }
},{timestamps:true})

module.exports = mongoose.model("serviceCategory", servicecategorySchema)