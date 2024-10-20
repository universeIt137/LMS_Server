const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const uploadVideoSchema = new Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    module_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    video_name: {
        type: String,
        required: true
    },
    video_url: {
        type: String,
        required: true
    },
}, {timestamps: true,versionKey:false});

const UploadVideoModel = model('upload-videos', uploadVideoSchema);

module.exports = UploadVideoModel;