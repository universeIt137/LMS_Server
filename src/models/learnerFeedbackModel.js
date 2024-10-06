const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const lernerFeedbackSchema = new Schema({
    name : {
        type : String,
    },
    course_id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    img : {
        type : String,
    },
    feedback : {
        type : String
    },
},{
    timestamps:true,
    versionKey:false
});

const lernerFeedbackModel = model("lerner-Feedback", lernerFeedbackSchema );

module.exports = lernerFeedbackModel;