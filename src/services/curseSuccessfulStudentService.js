const { default: mongoose } = require("mongoose");
const successfulStudentModel = require("../models/successfullStudentModel");
exports.courseSuccessfulStudent = async ()=>{
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

        // unwind corseData

        const unwindCourseData = { $unwind: "$courseData" };

        // projection

        const projection = {
            $project: {
                "img": 1,
                "student_name": 1,
                "batch_no": 1,
                "position_of_job": 1,
                "company_name": 1,
                "courseData.course_name": 1
            }
        };
        

        let data = await successfulStudentModel.aggregate([
            joinWithCourseId,
            unwindCourseData,
            projection
        ]);
        if(data.length ===0){
            return {
                status: "fail",
                message: "No course successful students found"
            };
        }
        return {
            status: "success",
            message: "Course successful students retrieved successfully",
            data : data
        };
    } catch (error) {
        return {
            status : "fail",
            msg : error.toString(),
        }
    };
};

exports.getSingleStudentService = async (req)=>{
    let id = new  mongoose.Types.ObjectId(req.params.id);
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

        // unwind corseData

        const unwindCourseData = { $unwind: "$courseData" };

        // projection

        const projection = {
            $project: {
                "img": 1,
                "student_name": 1,
                "batch_no": 1,
                "position_of_job": 1,
                "company_name": 1,
                "courseData.course_name": 1
            }
        };
        

        let data = await successfulStudentModel.aggregate([
            matchStage, 
            joinWithCourseId,
            unwindCourseData,
            projection
        ]);
        if(data.length ===0){
            return {
                status: "fail",
                message: "No course successful students found"
            };
        }
        return {
            status: "success",
            message: "Course successful students retrieved successfully",
            data : data
        };
    } catch (error) {
        return {
            status : "fail",
            msg : error.toString(),
        }
    };
};


