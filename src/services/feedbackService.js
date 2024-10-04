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
                joinWithCourseId,
                joinWithStudentId,
                unwindStudentData,
                unwindCourseData,
                projection
            ]);
            return {
                status: "success",
                msg: "Find all data successfully",
                data: data
            };
        } catch (error) {
            
        }
    };
}

const feedbackService = new feedbackClass();

module.exports = feedbackService;