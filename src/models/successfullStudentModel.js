const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const successfulStudentSchema = new Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId, 
    },
    img : {
        type : String, 
    },
    student_name: {
        type: String,
    },
    batch_no: {
        type: Number,
    },
    position_of_job: { 
        type: String
    },
    company_name: {
        type : String,
    },
}, {
    timestamps: true,
    versionKey: false
});

const SuccessfulStudentModel = model("successful-Student", successfulStudentSchema);

module.exports = SuccessfulStudentModel;