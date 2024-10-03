const curriculumModel = require("../models/curriculumModel");


class curriculumClass {
    allCurriculumService = async () =>{
        try {
            // join with course id 
            let joinWithCourseId = {
                $lookup: {
                    from: "courses",
                    localField: "course_id",
                    foreignField: "_id",
                    as: "courseData"
                }
            };

            // unwind courseData
            const unwindCourseData = {  $unwind: "$courseData" };

            // projection courseData
            const projection = { $project : {
                "course_id" : 1,
                "course_name" : 1,
                "record_video" : 1,
                "live_class" : 1,
                "quiz" : 1,
                "title" : 1,
                "description" : 1,
                "courseData._id": 1,
                "courseData.course_name" : 1
            }};

            let data = await curriculumModel.aggregate([
                joinWithCourseId,
                unwindCourseData,
                projection
            ]);

            if(data.length < 0) {
                return {
                    status: "fail",
                    message: "No curriculum found",
                };
            }

            return {
                status: "success",
                message: "All curriculums retrieved successfully",
                data : data 
            };

        } catch (error) {
            return { 
                status : "fail",
                message : error.toString()
            }
        }
    }
}

const curriculumService = new curriculumClass();

module.exports = curriculumService;