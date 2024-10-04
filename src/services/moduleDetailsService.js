const { default: mongoose } = require("mongoose");
const moduleDetailsController = require("../controllers/admin/moduleDetailsController");
const moduleDetailsModel = require("../models/moduleDetailsModel");

class ModuleDetailsClass {

    allModuleDetailsService = async ()=>{
        try {
            // join with course id
            const joinWithCourseId = {
                $lookup: {
                    from: "courses",
                    localField: "course_id",
                    foreignField: "_id",
                    as: "courseData",
                }
            };

            // join with module id 

            const joinWithModuleId = {
                $lookup: {
                    from: "modules",
                    localField: "module_id",
                    foreignField: "_id",
                    as: "moduleData",
                }
            }

            // projection

            const projection = {
                $project : {
                    "courseData.course_name" : 1,
                }
            };

            const data = await moduleDetailsModel.aggregate([
                joinWithCourseId,
                joinWithModuleId,
            ]);
            if(data.length===0) return{
                status:"fail",
                msg : "Module details not found",
            }
            return {
                status:"success",
                msg : "All module details retrieved successfully",
                data,
            }
        } catch (error) {
            return {
                status:"fail",
                message: error.message,
            }
        }
    };

    singleModuleDetailsService = async (req)=>{
        let id = new mongoose.Types.ObjectId(req.params.id);
        try {
            // match stage
            let matchStage = { $match: { _id: id } };
            // join with course id
            const joinWithCourseId = {
                $lookup: {
                    from: "courses",
                    localField: "course_id",
                    foreignField: "_id",
                    as: "courseData",
                }
            };
            // join with module id
            const joinWithModuleId = {
                $lookup: {
                    from: "modules",
                    localField: "module_id",
                    foreignField: "_id",
                    as: "moduleData",
                }
            }
            // projection
            const projection = {
                $project : {
                    "courseData.course_name" : 1,
                }
            };
            const data = await moduleDetailsModel.aggregate([
                matchStage,
                joinWithCourseId,
                joinWithModuleId,
            ]);
            if(data.length===0) return{
                status:"fail",
                msg : "Module details not found",
            };
            return {
                status:"success",
                msg : "Single module details retrieved successfully",
                data,
            }
        } catch (error) {
            return {
                status:"fail",
                message: error.message,
            }
        }
    }
}

const moduleDetailsService = new ModuleDetailsClass();

module.exports = moduleDetailsService;