const { default: mongoose } = require("mongoose");
const projectModel = require("../models/projectModel");

class projectClass {
    getAllProjectsService = async ()=>{
        try {
            // join with course id
            const joinWithCourseId = {
                $lookup: {
                    from: "courses",
                    localField: "course_id",
                    foreignField: "_id",
                    as: "corseData"
                }
            };

            // unwind course data

            const unwindCourseData = { $unwind: "$corseData" };

            // projection

            let projection = {
                $project: {
                    "project_img": 1,
                    "project_name": 1,
                    "corseData.course_name": 1,
                }
            };

            let data = await projectModel.aggregate([
                joinWithCourseId,
                unwindCourseData,
                projection
            ]);

            if(data.length===0){
                return {
                    status : "fail",
                    msg : "Projects not found",
                }
            }

            return {
                status : "success",
                msg : "Find all projects successfully",
                data: data,
            }

        } catch (error) {
            return {
                status : "fail",
                msg : error.toString(),
            }
        }
    };
    getSingleProjectService = async (req)=>{
        try {
            let id = new mongoose.Types.ObjectId(req.params.id);
            // match stage 
            let matchStage = { $match: { _id: id } };
            // join with course id
            const joinWithCourseId = {
                $lookup: {
                    from: "courses",
                    localField: "course_id",
                    foreignField: "_id",
                    as: "corseData"
                }
            };

            // unwind course data

            const unwindCourseData = { $unwind: "$corseData" };

            // projection

            let projection = {
                $project: {
                    "project_img": 1,
                    "project_name": 1,
                    "corseData.course_name": 1,
                }
            };

            let data = await projectModel.aggregate([
                matchStage,
                joinWithCourseId,
                unwindCourseData,
                projection
            ]);

            if(data.length===0){
                return {
                    status : "fail",
                    msg : "Projects not found",
                }
            }

            return {
                status : "success",
                msg : "Find all projects successfully",
                data: data,
            }

        } catch (error) {
            return {
                status : "fail",
                msg : error.toString(),
            }
        }
    };
}

const projectService = new projectClass();

module.exports = projectService;