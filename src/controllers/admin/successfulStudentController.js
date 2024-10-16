const successfulStudentModel = require("../../models/successfullStudentModel");
const {successfulStudentByCourseIdService,getSingleStudentService,courseSuccessfulStudent} = require("../../services/curseSuccessfulStudentService");


class successfulStudentClass {
    create = async (req, res) => {
        try {
            let reqBody = req.body;
            let data = await successfulStudentModel.create(reqBody);
            return res.status(201).json({
                status: "success",
                msg: "create successfully",
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString()
            });
        }
    };

    update = async (req, res) => {
        try {
            let id = req.params.id;
            let reqBody = req.body;
            let update = reqBody;
            let filter = { _id: id };

            // Use findById with the id directly
            let data = await successfulStudentModel.findById(id);

            if (!data) return res.status(404).json({
                status: "fail",
                msg: "student data not found",
            });
            let updateData = await successfulStudentModel.findByIdAndUpdate
                (filter, update, { new: true });
            return res.status(200).json({
                status: "success",
                msg: "Update successfully",
                data: updateData
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString()
            });
        }
    };

    successfulStudentDelete = async (req, res) => {
        try {
            let id = req.params.id;
            let filter = { _id: id };
            let data = await successfulStudentModel.findById({ _id: id });
            if (!data) return res.status(404).json({
                status: "fail",
                msg: "student data not found",
            });
            await successfulStudentModel.findByIdAndDelete(filter);
            return res.status(200).json({
                status: "success",
                msg: "delete successfully",
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString()
            });
        }
    };

    allSuccessfulStudent = async (req, res) => {
        let data = await courseSuccessfulStudent()
        res.send(data);
    };
    getSingleStudentById = async (req, res) => {
        let data = await getSingleStudentService(req);
        res.send(data);
    };
    studentByCourseId = async (req, res) => {
        let data = await successfulStudentByCourseIdService(req);
        res.send(data);
    };
};


const successfulStudentController = new successfulStudentClass();

module.exports = successfulStudentController;