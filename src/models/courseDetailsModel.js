const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const courseDetailsSchema = new Schema({
    course_id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    rating  : {
        type : Number
    },
    course_fee : {
        type : Number,
        required : true
    },
    total_live_class : {
        type : Number
    },
    total_project : {
        type : Number,
        required : true
    },
    total_video : {
        type : Number,
        required : true
    },
    course_duration : {
        type : Number,
    },
    course_video : {
        type : String,
    },
    youtube_video_url : {
        type : String,
    },
},{
    timestamps:true,
    versionKey:false
});

const courseDetailsModel = model("course-Details",courseDetailsSchema);

module.exports = courseDetailsModel;