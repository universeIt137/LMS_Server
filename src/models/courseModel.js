const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const courseSchema = new Schema({
    title : {
        type : String,
        require : true
    },
    courseId : {
        type : mongoose.Schema.Types.ObjectId,
        require:true
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