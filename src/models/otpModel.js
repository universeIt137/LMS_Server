const mongoose = require('mongoose');
const { Schema,model } = mongoose;

const otpSchema = new Schema({
    otp : {
        type: String,
    },
    status:{
        type:String,
    },
    token:{
        type : String,
    }
},{timestamps:true,versionKey:false});
const otpModel = model("otp",otpSchema);

module.exports = otpModel;