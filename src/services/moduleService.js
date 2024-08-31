const { default: mongoose } = require("mongoose");
const moduleModel = require("../models/moduleModel");

class moduleServicesClass {
    getAllModuleService = async () => {
        try {
          // Join with course collection on course_id
            const joinWithCourseId = {
                $lookup: {
                from: "courses",
                localField: "course_id",
                foreignField: "_id",
                as: "data"
                }
            };
        
            // Unwind the array from the lookup stage
            const unwindData = { $unwind: "$data" };
        
            // Projection to exclude certain fields
            let projection = {
                $project: { // Changed from $projection to $project
                "updatedAt": 0,
                "data._id": 0,
                "data.course_img": 0,
                "data.instructor_name": 0,
                "data.instructor_img": 0,
                "data.total_sit": 0,
                "data.createdAt": 0,
                "data.updatedAt": 0
                }
            };
        
            // Execute the aggregation pipeline
            const data = await moduleModel.aggregate([
                joinWithCourseId,
                unwindData,
                projection
            ]);

            if(data.length===0){
                return {
                    status:"fail",
                    dat : data
                };
            }
                return {
                    status: "success",
                    msg: "Found all module data",
                    data: data
                };
            } catch (error) {
                return {
                    status: "fail",
                    msg: error.toString()
                };
            }
    };

    getSingleModuleService = async (req) => {
        try {
            const id = new mongoose.Types.ObjectId(req.params.id);
        
            const matchStage = { $match: { _id: id } };
        
            const joinWithCourseId = {
                $lookup: {
                from: "courses",
                localField: "course_id",
                foreignField: "_id",
                as: "data"
                }
            };
        
            const unwindData = { $unwind: "$data" };
        
            let projection = {
                $project: {
                "updatedAt": 0,
                "data._id": 0,
                "data.course_img": 0,
                "data.instructor_name": 0,
                "data.instructor_img": 0,
                "data.total_sit": 0,
                "data.createdAt": 0,
                "data.updatedAt": 0
                }
            };
        
            const data = await moduleModel.aggregate([
                matchStage,
                joinWithCourseId,
                unwindData,
                projection
            ]);

            if(data.length===0){
                return {
                    status:"fail",
                    msg : "Module not found"
                }
            }
            return {
                status: "success",
                msg: "Found single module data",
                data: data
            };
            } catch (error) {
            return {
                status: "fail",
                msg: error.toString()
            };
            }
    };
        
}


const moduleService = new moduleServicesClass();

module.exports = moduleService;