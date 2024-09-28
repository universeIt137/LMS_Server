const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const successfulStudentSchema = new Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId, 
    },
    student_name: {
        type: String,
        required: [true, "Student name required"]
    },
    batch_no: {
        type: Number,
        required: true
    },
    position_of_job: { 
        type: String
    },
    company_name: {
        type : String,
        required: [true, "Company name required"]
    },
}, {
    timestamps: true,
    versionKey: false
});

const SuccessfulStudentModel = model("successful-Student", successfulStudentSchema);

module.exports = SuccessfulStudentModel;