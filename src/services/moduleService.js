const { default: mongoose } = require("mongoose");
const moduleModel = require("../models/moduleModel");

class moduleServicesClass {
    getAllModuleService = async () => {
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

            const unwindCourseData = { $unwind: "$courseData" };

            // projection 

            const projection = {
                $project: {
                    "module_name": 1,
                    "module_topic": 1,
                    "total_days_module": 1,
                    "total_live_class": 1,
                    "total_assignment": 1,
                    "total_pre_record_video": 1,
                    "total_quiz_test": 1,
                    "courseData.course_name": 1,
                    "courseData.course_img": 1,
                    "courseData.batch_no": 1,
                }
            }



            let data = await moduleModel.aggregate([
                joinWithCourseId,
                unwindCourseData,
                projection
            ]);
            return {
                status: "success",
                msg: "Find all data successfully",
                data: data
            }
        } catch (error) {
            return {
                status: "fail",
                msg: error.toString()
            }
        }
    };

    getSingleModuleService = async (req) => {
        try {
            const id = new mongoose.Types.ObjectId(req.params.id);

            const matchStage = { $match: { _id: id } };

            const joinWithCourseId = {
                $lookup: {
                    from: "courses",
                    localField: "course_id",
                    foreignField: "_id",
                    as: "data"
                }
            };

            const unwindData = { $unwind: "$data" };

            let projection = {
                $project: {
                    "course_id": 0,
                    "updatedAt": 0,
                    "data._id": 0,
                    "data.instructor_name": 0,
                    "data.instructor_img": 0,
                    "data.total_sit": 0,
                    "data.createdAt": 0,
                    "data.updatedAt": 0
                }
            };

            const data = await moduleModel.aggregate([
                matchStage,
                joinWithCourseId,
                unwindData,
            ]);

            if (data.length === 0) {
                return {
                    status: "fail",
                    msg: "Module not found"
                }
            }
            return {
                status: "success",
                msg: "Found single module data",
                data: data
            };
        } catch (error) {
            return {
                status: "fail",
                msg: error.toString()
            };
        }
    };


    moduleByCourseIdService = async (req) => {
        try {
            const id = new mongoose.Types.ObjectId(req.params.courseId);

            const matchStage = { $match: { course_id: id } };

            const joinWithCourseId = {
                $lookup: {
                    from: "courses",
                    localField: "course_id",
                    foreignField: "_id",
                    as: "data"
                }
            };

            const unwindData = { $unwind: "$data" };

            let projection = {
                $project: {
                    "course_id": 0,
                    "updatedAt": 0,
                    "data._id": 0,
                    "data.instructor_name": 0,
                    "data.instructor_img": 0,
                    "data.total_sit": 0,
                    "data.createdAt": 0,
                    "data.updatedAt": 0
                }
            };

            const data = await moduleModel.aggregate([
                matchStage,
                joinWithCourseId,
                unwindData,
            ]);

            if (data.length === 0) {
                return {
                    status: "fail",
                    msg: "Module not found"
                }
            }
            return {
                status: "success",
                msg: "Found find by course id",
                data: data
            };
        } catch (error) {
            return {
                status: "fail",
                msg: error.toString()
            };
        }
    };



}


const moduleService = new moduleServicesClass();

module.exports = moduleService;