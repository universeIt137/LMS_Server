const courseSuccessfulStudentModel = require("../models/successfullStudentModel")
const courseSuccessfulStudent = async ()=>{
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
                "student_name" : 1,
                "batch_no" : 1,
                "createdAt" :1,
                "position_of_job" : 1,
                "data.course_name" :  1
            }
        };

        // unwind data

        const unwindData = {"$unwind":"$data"}

        let data = await courseSuccessfulStudentModel.aggregate([
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


module.exports = courseSuccessfulStudent;