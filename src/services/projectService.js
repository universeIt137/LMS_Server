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
    projectByCourseIdService = async (req) => {
        try {
            let course_id = new mongoose.Types.ObjectId(req.params.course_id);
    
            // Match stage to filter by course_id
            const matchStage = { $match: { course_id: course_id } };
    
            // Join with the 'courses' collection using lookup
            const joinWithCourseId = {
                $lookup: {
                    from: "courses",
                    localField: "course_id",
                    foreignField: "_id",
                    as: "courseData",
                },
            };
    
            // Unwind course data to flatten the array
            const unwindCourseData = { $unwind: "$courseData" };
    
            // Projection to select relevant fields
            const projection = {
                $project: {
                    project_img: 1,
                    project_name: 1,
                    "courseData.course_name": 1,
                },
            };
    
            // Execute aggregation pipeline
            const data = await projectModel.aggregate([
                matchStage,
                joinWithCourseId,
                unwindCourseData,
            ]);
    
            // Check if data exists
            if (data.length === 0) {
                return {
                    status: "fail",
                    msg: "Projects not found",
                };
            }
    
            // Return successful response
            return {
                status: "success",
                msg: "Projects found successfully",
                data: data,
            };
        } catch (error) {
            // Handle errors and return fail response
            console.error(error);
            return {
                status: "fail",
                msg: "An error occurred while fetching projects: " + error.message,
            };
        }
    };
    
    
}

const projectService = new projectClass();

module.exports = projectService;