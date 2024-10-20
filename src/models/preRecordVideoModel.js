const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const proRecordSchema = new Schema({
    course_id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    module_id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    video_title : {
        type : String,
        required : [true,"Video title_must be required"]
    },
    video_link : {
        type : String,
        required : true
    }
},{
    timestamps : true,
    versionKey:false
});

const preRecordModel = model("pre-record-video",proRecordSchema);

module.exports = preRecordModel;