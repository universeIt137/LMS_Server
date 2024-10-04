const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const moduleDetailsSchema = new Schema({
    module_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    course_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },

},{timestamps:true,versionKey:false});


const moduleDetailsModel = model("module-details", moduleDetailsSchema);

module.exports = moduleDetailsModel;