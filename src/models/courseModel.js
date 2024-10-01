const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
    course_name: {
        type: String,
        required: [true, "Course name required"],  // No unique: true constraint
    },
    course_img: {
        type: String,
    },
    instructor_name: {
        type: String,
    },
    total_sit: {
        type: Number,
    },
    batch_no: {
        type: Number,
    }
}, { timestamps: true, versionKey: false });

const courseModel = model("course", courseSchema);

module.exports = courseModel;