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
                    as: "data"
                }
            };
    
            const projection = { $project : 
                {
                    "name" : 1,
                    "feedback" : 1,
                    "batch_no" : 1,
                    "createdAt" :1,
                    "data.course_name" :  1,
                    "data.batch_no" : 1
                }
            };
    
            // unwind data
    
            const unwindData = {"$unwind":"$data"}
    
            let data = await feedbackModel.aggregate([
                    joinWithCourseId,
                    unwindData,
                    projection
            ]);
    
            return {
                status:"success",
                msg : "Find all data successfully",
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

const feedbackService = new feedbackClass();

module.exports = feedbackService;