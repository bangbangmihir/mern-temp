const mongoose = require("mongoose")


const otpSchema = mongoose.Schema({
    Email: {
        type: String,
        required: true,
    },
    Otp: {
        type: String,
        required: true,
    },
    expiresIn: {
        type: String,
        required: true,
    }
}, { timestamps: true })


// otpSchema.createIndex( { "createdAt": 1 }, { expireAfterSeconds: 3600 } )

otpSchema.index({createdAt: 1},{expireAfterSeconds: 3600});

module.exports = mongoose.model("otp", otpSchema)