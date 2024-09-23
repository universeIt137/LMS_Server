const mongoose = require("mongoose");
const {Schema,model} = mongoose;
const bcrypt = require('bcrypt');

const signUpSchema = new Schema({
    id : {
        type : String,
    },
    firstName: {
        type : String,
    },
    lastName : {
        type : String,
    },
    username : {
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    profile_pick : {
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