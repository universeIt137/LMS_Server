const successfulStudentModel = require("../../models/successfullStudentModel");
const courseSuccessfulStudent = require("../../services/curseSuccessfulStudentService");
const cloudHelper = require("../../helper/cloudinaryHelper")


class successfulStudentClass {
    create = async (req, res) => {
        try {
            let { course_id, student_name, batch_no, position_of_job, company_name } = req.body;
            console.log(course_id, student_name, batch_no, position_of_job, company_name)

            let studentImg = ""
            console.log(req.file)

            if (req.file) {
                const result = await cloudHelper.uploader.upload(req.file.path, {
                    folder: "student-images",
                });
                studentImg = result.secure_url;
            }
            let data = new successfulStudentModel({
                course_id,
                img: studentImg,
                student_name,
                batch_no,
                position_of_job,
                company_name
            });

            await data.save();

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
            console.log(id)
            let filter = { _id: id };
            let reqBody = req.body;
            let update = reqBody;
            let data = await successfulStudentModel.findById({ _id: id });
            console.log(data);
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

    allSuccessfulStudentByAdmin = async (req, res) => {
        let data = await courseSuccessfulStudent()
        res.send(data);
    }
};


const successfulStudentController = new successfulStudentClass();

module.exports = successfulStudentController;