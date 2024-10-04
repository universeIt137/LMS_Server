const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const projectSchema = new Schema({
    project_img : {
        type : String,
    },
    project_name : {
        type : String,
    },
    course_id : {
        type : mongoose.Schema.Types.ObjectId,
    }
},{
    timestamps:true,
    versionKey:false
});

const projectModel = model("project-data",projectSchema);

module.exports = projectModel