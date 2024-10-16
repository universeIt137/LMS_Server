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
            

            // unwind courseData
            const unwindCourseData = {  $unwind: "$courseData" };
            

            let data = await feedbackModel.aggregate([
                matchStage,
                joinWithCourseId,
                unwindCourseData
                
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

    feedbackByCourseIdService = async (req) => {
        const courseId = new mongoose.Types.ObjectId(req.params.courseId);
    
        try {
            // Match stage to filter feedback by course ID
            const matchStage = { $match: { course_id: courseId } };
    
            // Join with courses collection to get course details
            const joinWithCourseId = {
                $lookup: {
                    from: "courses",
                    localField: "course_id",
                    foreignField: "_id",
                    as: "courseData"
                }
            };
    
            // Unwind courseData to flatten the result
            const unwindCourseData = { $unwind: "$courseData" };
    
            // Execute aggregation pipeline
            const data = await feedbackModel.aggregate([
                matchStage,
                joinWithCourseId,
                unwindCourseData
            ]);
    
            // If no data found, return a fail response
            if (data.length === 0) {
                return {
                    status: "fail",
                    msg: "No feedback found for this course"
                };
            }
    
            // Success response
            return {
                status: "success",
                msg: "Feedback retrieved successfully by course ID",
                data: data
            };
    
        } catch (error) {
            // Error response
            return {
                status: "fail",
                error: error.message
            };
        }
    };

}

const feedbackService = new feedbackClass();

module.exports = feedbackService;