const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const signUpSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
    },
    phone_number: {
        type: Number,
    },
    password : {
        type : String,
        min : 6,
        max : 12,
        required : true
    },
    img : {
        type : String,
        required : true
    },
    role : {
        type : String,
    }

},{timestamps:true,versionKey:false});

const signUpModel = model("signUp",signUpSchema);
module.exports = signUpModel;