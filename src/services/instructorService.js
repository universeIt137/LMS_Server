const { default: mongoose } = require("mongoose");
const instructorModel = require("../models/instructorModel");

class instructorClass {
    getAllInstructorService = async ()=>{
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
                "instructor_name" : 1,
                "instructor_img" : 1,
                "instructor_role" : 1,
                "courseData.course_name" :  1,
            }};

            let data = await instructorModel.aggregate([
                joinWithCourseId,
                unwindCourseData,
            ]);

            if(data.length < 0) {
                return {
                    status: "fail",
                    message: "No instructor found",
                };
            }

            return {
                status: "success",
                message: "All instructor retrieved successfully",
                data : data 
            };

        } catch (error) {
            return { 
                status : "fail",
                message : error.toString()
            }
        }
    };

    getSingleInstructorService = async (req)=>{
        let id = new mongoose.Types.ObjectId(req.params.id);
        try {
            // match stage
            let matchStage = { $match: { _id: id } };
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
                "instructor_name" : 1,
                "instructor_img" : 1,
                "instructor_role" : 1,
                "courseData.course_name" :  1,
            }};

            let data = await instructorModel.aggregate([
                matchStage,
                joinWithCourseId,
                unwindCourseData,
            ]);

            if(data.length < 0) {
                return {
                    status: "fail",
                    message: "No instructor found",
                };
            }

            return {
                status: "success",
                message: "Single instructor retrieved successfully",
                data : data 
            };

        } catch (error) {
            return { 
                status : "fail",
                message : error.toString()
            }
        }
    };

    instructorByCourseId = async (req)=>{
        let id = new mongoose.Types.ObjectId(req.params.courseId);
        try {
            // match stage
            let matchStage = { $match: { course_id: id } };
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
                "instructor_name" : 1,
                "instructor_img" : 1,
                "instructor_role" : 1,
                "courseData.course_name" :  1,
            }};
            let data = await instructorModel.aggregate([
                matchStage,
                joinWithCourseId,
                unwindCourseData,
            ]);
            if(data.length < 0) {
                return {
                    status: "fail",
                    message: "No instructor found for this course",
                };
            }
            return {
                status: "success",
                message: "Instructors retrieved successfully for the course",
                data : data 
            }; 
            
        } catch (error) {
            return {
                status : "fail",
                message : error.toString()
            }
        }
        

    };



}

const instructorService = new instructorClass();

module.exports = instructorService;