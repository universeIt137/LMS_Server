const { default: mongoose } = require("mongoose");
const feedbackModel = require("../models/learnerFeedbackModel");

class feedbackClass {
    findAllFeedbackService = async ()=>{
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
            // join with student id
            

            // unwind courseData
            const unwindCourseData = {  $unwind: "$courseData" };

            // projection

            const projection = {
                $project: {
                    "feedback": 1,
                    "courseData.course_name": 1,
                    "studentData.profile_pick" : 1,
                }
            };
            

            let data = await feedbackModel.aggregate([
                joinWithCourseId,
                unwindCourseData,
                // projection
            ]);

            if(data.length===0){
                return {
                    status: "fail",
                    msg: "Data not found",
                };
            }
            return {
                status: "success",
                msg: "Find all data successfully",
                data: data
            };
        } catch (error) {
            return {
                status: "fail",
                error: error.message
            }
        }
    };

    singleFeedbackService = async (req)=>{
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
            // join with student id
            let joinWithStudentId = {
                $lookup: {
                    from: "users",
                    localField: "student_id",
                    foreignField: "_id",
                    as: "studentData"
                }
            };

            // unwind courseData
            const unwindCourseData = {  $unwind: "$courseData" };
            const unwindStudentData = {  $unwind: "$studentData" };

            // projection

            const projection = {
                $project: {
                    "feedback": 1,
                    "courseData.course_name": 1,
                    "studentData.profile_pick" : 1,
                }
            };
            

            let data = await feedbackModel.aggregate([
                matchStage,
                joinWithCourseId,
                joinWithStudentId,
                unwindStudentData,
                unwindCourseData,
                projection
            ]);
            if(data.length===0){
                return {
                    status: "fail",
                    msg: "Data not found",
                };
            }
            return {
                status: "success",
                msg: "Find all data successfully",
                data: data
            };
        } catch (error) {
            return {
                status: "fail",
                error: error.message
            }
        }
    }
}

const feedbackService = new feedbackClass();

module.exports = feedbackService;