const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const moduleDetailsSchema = new Schema({

},{timestamps:true,versionKey:false});


const moduleDetailsModel = model("moduleDetails", moduleDetailsSchema);

module.exports = moduleDetailsModel;