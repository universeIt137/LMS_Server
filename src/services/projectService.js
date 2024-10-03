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