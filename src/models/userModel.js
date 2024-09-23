const mongoose = require("mongoose");
const {Schema,model} = mongoose;
const bcrypt = require('bcrypt');

const signUpSchema = new Schema({
    id : {
        type : String,
        required : true
    },
    firstName: {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    username : {
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
        required : true,
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    img : {
        type : String,
    },
    role : {
        type : String,
        default : "student",
        enum : ["student", "instructor", "admin"]
    }

},{timestamps:true,versionKey:false});

const userModel = model("users",signUpSchema);
module.exports = userModel;