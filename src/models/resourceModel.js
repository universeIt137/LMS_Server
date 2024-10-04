const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const resourceSchema = new Schema({
    course_id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    module_id : {
        type : mongoose.Schema.Types.ObjectId, 
    },
    module_details_id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    name_of_resource : {
        type : String,
        required : true
    },
    github_link : {
        type : String
    }
},{
    timestamps:true,
    versionKey:false
});

const resourceModel = model("resource",resourceSchema);

module.exports = resourceModel;