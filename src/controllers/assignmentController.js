const assignmentModel = require("../models/assignmentModel");
const {parseUserToken} = require("../helper/helper");
const mongoose = require("mongoose");

class assignmentClass {
    createAssignment = async (req,res)=>{
        const userToken = parseUserToken(req);
        try {
            let reqBody = req.body;

            if (userToken.role==="super-admin" || userToken.role==="admin" ){
                let data = await assignmentModel.create(reqBody);
                return res.status(201).json({
                    status : "success",
                    data : data
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : "Permission not allow"
                });
            }

        }catch (e) {

            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });

        }
    };
    updateAssignment = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let id = req.params.id;
            let matchStage = {
                _id : id
            };
            let data = await assignmentModel.findById(matchStage);
            if (!data) return res.status(404).json({
                status : "fail",
                msg : "User not found"
            });
            if ( userToken.role==="super-admin" || userToken.role==="admin" ){
                let reqBody = req.body;
                await assignmentModel.findByIdAndUpdate(matchStage,reqBody);
                return res.status(200).json({
                    status : "success",
                    msg : 'Assignment update successfully'
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : "Permission not allow"
                });
            }
        }catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };

    deleteAssignment = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let id = req.params.id;
            let matchStage = { _id: id };
            let data = await assignmentModel.findById(matchStage);
            if (!data) return res.status(404).json({
                status : "fail",
                msg : "Data not found"
            });

            if (userToken.role==="admin" || userToken.role === "super-admin"){
                await assignmentModel.findByIdAndDelete(matchStage);
                return res.status(200).json({
                    status : "success",
                    msg : "Delete successfully"
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : "Permission not allow"
                });
            }
        }catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };

    singleAssignment = async (req,res)=>{
        try {
            let id = new mongoose.Types.ObjectId(req.params.id);
            let matchStage = { $match : { _id : id} }
            let joinWithCourseId = {
                $lookup: {
                    from: "courses",
                    localField: "course_id",
                    foreignField: "_id",
                    as: "course_details"
                }
            };

            let joinWithModuleId = {
                $lookup: {
                    from: "modules",
                    localField: "module_id",
                    foreignField: "_id",
                    as: "module-details"
                }
            };

            const unwindCourseDetails = { $unwind : "$course_details" };
            const unwindModuleDetails = { $unwind : "$module-details" };

            const projectionStage = {
                $project : {
                    "assignment_name" : 1,
                    "course_details.course_name" : 1,
                    "instructor_name" : 1,
                    "module-details.module_name" : 1,
                    "module-details.module_topic" : 1
                }
            }


            const data = await assignmentModel.aggregate([
                matchStage,
                joinWithCourseId,
                joinWithModuleId ,
                unwindCourseDetails,
                unwindModuleDetails,
                projectionStage
            ]);

            return res.status(200).json({
                status : "success",
                data : data
            })

        }catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };

    allAssignment = async (req, res) => {
        const userToken = parseUserToken(req);
        try {
            let joinWithCourseId = {
                $lookup: {
                    from: "courses",
                    localField: "course_id",
                    foreignField: "_id",
                    as: "course_details"
                }
            };

            let joinWithModuleId = {
                $lookup: {
                    from: "modules",
                    localField: "module_id",
                    foreignField: "_id",
                    as: "module-details"
                }
            };
            const unwindCourseDetails = { $unwind : "$course_details" };
            const unwindModuleDetails = { $unwind : "$module-details" };

            const projectionStage = {
                $project : {
                    "assignment_name" : 1,
                    "course_details.course_name" : 1,
                    "instructor_name" : 1,
                    "module-details.module_name" : 1,
                    "module-details.module_topic" : 1
                }
            };

            if (userToken.role==="admin" || userToken.role==="super-admin"){
                let data = await assignmentModel.aggregate([

                        joinWithCourseId,
                        joinWithModuleId,
                        unwindCourseDetails,
                        unwindModuleDetails,
                        projectionStage

                ]);

                return res.status(200).json({
                    status : "success",
                    data : data
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : "Permission not allow"
                })
            }

        }catch (e) {

            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });

        }
    };

}

const assignmentController = new assignmentClass();

module.exports = assignmentController;