const getInCourseModel = require("../../models/getInCourseModel");
const getInCourseService = require("../../services/getInService");

class getInCourseClass {
    create = async (req,res)=>{
        try {
            let reqBody = req.body;
            let data = await getInCourseModel.create(reqBody);
            return res.status(201).json({
                status:"success",
                msg : "create successfully",
                data : data
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };

    updateGetInCourse = async (req,res)=>{
        try {
            let id = req.params.id;
            let filter = {_id : id};
            let reqBody = req.body;
            let update = reqBody;
            let data = await getInCourseModel.findById({_id : id});
            if(!data) return res.status(404).json({
                status : "fail",
                msg : "getInCourse data not found"
            });
            let updateData = await getInCourseModel.findByIdAndUpdate
            (filter,update,{new:true});
            return res.status(200).json({
                status:"success",
                msg : "update successfully",
                data : updateData
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };

    deleteGetInCourse = async (req,res)=>{
        try {
            let id = req.params.id;
            let filter = {_id : id};
            let data = await getInCourseModel.findById({_id : id});
            if(!data) return res.status(404).json({
                status : "fail",
                msg : "getInCourse data not found"
            });
            await getInCourseModel.findByIdAndDelete(filter);
            return res.status(200).json({
                status:"success",
                msg : "getInCourse delete successfully",
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };

    allGetInCourseAdmin = async (req,res)=>{
        let data = await getInCourseService.allGetInService();
        res.send(data);
    };

    singleGetInCourseById = async (req,res)=>{
        let data = await getInCourseService.singleGetInService(req);
        res.send(data);
    };
    getInCourseByCourseId = async (req,res)=>{
        let data = await getInCourseService.getInCourseByCourseIdService(req);
        res.send(data);
    };



}

const getInCourseController = new getInCourseClass();

module.exports = getInCourseController;