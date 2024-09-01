const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const liveClassSchema = new Schema({
    module_id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    course_id : {
        type : mongoose.Schema.Types.ObjectId
    },
    live_class_name : {
        type : String
    },
    link_live_class : {
        type : String
    }
},{
    timestamps:true,
    versionKey:false
});

const liveClassModel = model("liveClass",liveClassSchema);

module.exports = liveClassModel