const { default: mongoose } = require("mongoose");
const preRecordVideoModel = require("../models/preRecordVideoModel");

exports.preRecordVideoByModuleIdService = async (req) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);

        const matchStage = { $match: { module_id: id } };

        const joinWithModuleId = {
            $lookup: {
                from: "modules",
                localField: "module_id",
                foreignField: "_id",
                as: "moduleData"
            }
        };

        const joinWithCourseId = {
            $lookup: {
                from: "courses",
                localField: "course_id",
                foreignField: "_id",
                as: "courseData"
            }
        };

        const unwindModuleData = { 
            $unwind: { path: "$moduleData", preserveNullAndEmptyArrays: true } 
        };

        const unwindCourseData = { 
            $unwind: { path: "$courseData", preserveNullAndEmptyArrays: true } 
        };

        const data = await preRecordVideoModel.aggregate([
            matchStage,
            joinWithModuleId,
            joinWithCourseId,
            unwindModuleData,
            unwindCourseData,
        ]);

        if (data.length === 0) {
            return { status: "fail", msg: "Data not found" };
        }

        return {
            status: "success",
            msg: "Get data by module id successfully",
            data: data,
        };

    } catch (error) {
        return { status: "fail", msg: `Error: ${error.message}` };
    }
};
