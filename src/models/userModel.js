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
        required : true
    },
    img : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum: ["user", "admin", "super-admin"],
        default : "user"
    }

},{timestamps:true,versionKey:false});

const userModel = model("signUp",signUpSchema);
module.exports = userModel;