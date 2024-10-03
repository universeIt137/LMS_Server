const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const getCourseSchema = new Schema({
    course_id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    logo : {
        type : String,
    },
    title : {
        type : String,
    },
    description : {
        type : String,
    }

},{
    timestamps:true,
    versionKey:false
});

const getCourseModel = model("get-in-course", getCourseSchema);

module.exports = getCourseModel;