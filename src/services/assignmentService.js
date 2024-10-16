const { default: mongoose } = require("mongoose");
const assignmentModel = require("../models/assignmentModel");

class assignmentServiceClass{
    getAllAssignmentService  = async ()=>{
        try {
            // join course id
            let joinCourseId = {
                    $lookup: {
                    from: "courses",
                    localField: "course_id",
                    foreignField: "_id",
                    as: "data"
                }
            };

            // join with module id

            const joinWithModuleId = {
                $lookup: {
                from: "modules",
                localField: "module_id",
                foreignField: "_id",
                as: "moduleData"
            }
        };

        const unwindData = { "$unwind" : "$data" };
        const moduleData = {"$unwind" : "$moduleData"};
        
        const projection = {
            $project : {
                "assignment_name" : 1,
                "createdAt" : 1,
                "data.course_name" : 1,
                "data.batch_no" : 1,
                "moduleData.module_name" :1
            }
        };

            let data = await assignmentModel.aggregate([
                joinCourseId,
                joinWithModuleId,
                unwindData,
                moduleData,
            ]);

            if(data.length===0){
                return {
                    status:"fail",
                    msg : "Assignment not found"
                };
            }
            return {
                status:"success",
                msg : "Assignment data found",
                data : data
            };
        } catch (error) {
            return {
                status:"fail",
                msg : error.toString()
            };
        }
    };


    singleAssignmentService  = async (req)=>{
        let id = new mongoose.Types.ObjectId(req.params.assignmentId);
        let matchStage = { $match: { _id : id } };
        try {
            // join course id
            let joinCourseId = {
                    $lookup: {
                    from: "courses",
                    localField: "course_id",
                    foreignField: "_id",
                    as: "data"
                }
            };

            // join with module id

            const joinWithModuleId = {
                $lookup: {
                from: "modules",
                localField: "module_id",
                foreignField: "_id",
                as: "moduleData"
            }
        };

        const unwindData = { "$unwind" : "$data" };
        const moduleData = {"$unwind" : "$moduleData"};
        
        

            let data = await assignmentModel.aggregate([
                matchStage,
                joinCourseId,
                joinWithModuleId,
                unwindData,
                moduleData,
            ]);

            if(data.length===0){
                return {
                    status:"fail",
                    msg : "Assignment not found"
                };
            }
            return {
                status:"success",
                msg : "Assignment data found",
                data : data
            };
        } catch (error) {
            return {
                status:"fail",
                msg : error.toString()
            };
        }
    };
}

const assignmentService = new assignmentServiceClass();

module.exports = assignmentService;