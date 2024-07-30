const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const signUpSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        validate : {
            validator : (v) =>{
                return /\^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message : props => `${props.value} is not a valid email!`
        },
        required: [true, 'User email required']
    },
    phone_number: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
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