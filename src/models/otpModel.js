const mongoose = require('mongoose');
const { Schema,model } = mongoose;

const otpSchema = new Schema({
    otp : {
        type: String,
        required: true,
        unique: true
    },
    status:{
        type:String,
        required:true
    },
    token:{
        type : String,
        required:true
    }
},{timestamps:true,versionKey:false});
const otpModel = model("otp",otpSchema);

module.exports = otpModel;