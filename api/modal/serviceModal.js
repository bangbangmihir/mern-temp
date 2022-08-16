const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    ServiceName:{
        type:String,
        required:true, 
    },

    serviceType:[{ type: mongoose.Schema.Types.ObjectId, ref: 'serviceCategory' }],

    ServicePrice:{
        type:String,
        required:true, 
    },
    ServiceHeading:{
        type:String,
        required:true, 
    },
    ServiceDescription:{
        type:String,
        required:true, 
    },
    ServiceImage:{
        type:String,
    },
    
},{timestamps:true})

module.exports = mongoose.model("Service",serviceSchema);