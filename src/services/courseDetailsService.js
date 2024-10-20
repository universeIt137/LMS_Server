const { default: mongoose } = require("mongoose");
const courseDetailsModel = require("../models/courseDetailsModel");

class courseDetailsClass {
    courseDetailsByCourseId = async (req) => {
        let id = new mongoose.Types.ObjectId(req.params.courseId);
        let matchStage = { $match: { course_id: id } };
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

            let unwindCourseData = { $unwind: "$courseData" };

            let data = await courseDetailsModel.aggregate([
                matchStage,
                joinWithCourseId,
                unwindCourseData
            ]);

            if (data.length === 0) {
                return {
                    status: "fail",
                    msg: "Data not found",
                };
            }
            return {
                status: "success",
                msg: "Get data by course id successfully",
                data: data,
            };

        } catch (error) {
            return {
                status: "fail",
                msg: error.toString(),
            }
        }
    };
    singleCourseDetailsService = async (req)=>{
        let id = new mongoose.Types.ObjectId(req.params.id);
        try {
            let matchStage = {$match : { _id : id }};
            let joinWithCourseId = {
                $lookup: {
                    from: "courses",
                    localField: "course_id",
                    foreignField: "_id",
                    as: "courseData"
                }
            };
            let unwindCourseData = { $unwind: "$courseData" };
            let data = await courseDetailsModel.aggregate([
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
                msg: "Get single course details successfully",
                data: data,
            };
            
        } catch (error) {
            return {
                status: "fail",
                msg: error.toString(),
            }
        }
    }
}

const courseDetailsService = new courseDetailsClass();

module.exports = courseDetailsService;