const mongoose = require("mongoose");
const stream = require("node:stream");
const {Schema,model} = mongoose;

const courseSchema = new Schema({
    course_name : {
        type : String,
        require : true
    },
    instructor_name : {
        type :String,
        require:true
    },
    instructor_img : {
        type : String,
        required:true
    },
    total_sit : {
        type : Number,
        require : true
    },
    batch_no : {
        type : Number,
        required : true
    }

},{timestamps:true,versionKey:false});


const courseModel = model("courses",courseSchema);

module.exports = courseModel;