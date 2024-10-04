const resourceModel = require("../models/resourceModel");

class resourceClass {
    allResourceService = async (req,res)=>{
        try {
            // join with course id 
            let joinWithCourseId = {
                $lookup: {
                    from: "courses",
                    localField: "course_id",
                    foreignField: "_id",
                    as: "data"
                }
            };
            // join with module id
            let joinWithModuleId = {
                $lookup: {
                    from: "modules",
                    localField: "module_id",
                    foreignField: "_id",
                    as: "moduleData"
                }
            };
            // join with module details id
            const joinWithModuleDetailsId = {
                $lookup: {
                    from: "module-details",
                    localField: "module_details_id",
                    foreignField: "_id",
                    as: "moduleDetailsData"
                }
            }
            let data = await resourceModel.aggregate([
                joinWithCourseId,
                joinWithModuleId,
                joinWithModuleDetailsId
            ]);
            return {
                status : "success",
                msg : "Find all data successfully",
                data : data
            };
        } catch (error) {
            return {
                status : "fail",
                msg : error.toString()
            };
        }
    }
}

const resourceService = new resourceClass();

module.exports = resourceService;