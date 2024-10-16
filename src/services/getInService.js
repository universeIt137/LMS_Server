const { default: mongoose } = require("mongoose");
const getInCourseModel = require("../models/getInCourseModel");

class getInCourseClass {
    allGetInService = async () => {
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

            // projection

            let projection = {
                $project: {
                    "logo": 1,
                    "title": 1,
                    "description": 1,
                    "courseData.course_name": 1
                }
            };


            let data = await getInCourseModel.aggregate([
                joinWithCourseId,
                unwindCourseData,
            ]);

            if (data.length === 0) {
                return {
                    status: "fail",
                    msg: "Data not found",
                };
            }
            return {
                status: "success",
                msg: "Get all data successfully",
                data: data
            };

        } catch (error) {
            return {
                status: "fail",
                msg: error.toString(),
            }
        }
    };

    singleGetInService = async (req) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
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

            let unwindCourseData = { $unwind: "$courseData" };

            // projection

            let projection = {
                $project: {
                    "logo": 1,
                    "title": 1,
                    "description": 1,
                    "courseData.course_name": 1
                }
            };


            let data = await getInCourseModel.aggregate([
                matchStage,
                joinWithCourseId,
                unwindCourseData,
            ]);

            if (data.length === 0) {
                return {
                    status: "fail",
                    msg: "Data not found",
                };
            }
            return {
                status: "success",
                msg: "Get single data successfully",
                data: data
            };

        } catch (error) {
            return {
                status: "fail",
                msg: error.toString(),
            }
        }
    };

    getInCourseByCourseIdService = async (req) => {
        const courseId = new mongoose.Types.ObjectId(req.params.courseId);
        let matchStage = { $match: { course_id: courseId } };
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

            let data = await getInCourseModel.aggregate([
                matchStage,
                joinWithCourseId,
                unwindCourseData,
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
                data: data
            };

        } catch (error) {
            return {
                status: "fail",
                msg: error.toString(),
            }
        }
    };

}

const getInCourseService = new getInCourseClass();

module.exports = getInCourseService;