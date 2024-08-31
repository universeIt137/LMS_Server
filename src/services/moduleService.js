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
        
}


const moduleService = new moduleServicesClass();

module.exports = moduleService;