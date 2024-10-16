const courseDetailsModel = require("../../models/courseDetailsModel");
const courseDetailsService = require("../../services/courseDetailsService"); 

class courseDetailsClass {
    courseDetailsCreated = async (req,res)=>{
        try {
            let reqBody = req.body;
            let data = await courseDetailsModel.create(reqBody);
            return res.status(201).json({
                status:"success",
                data : data
            });
        } catch (error) {
            return res.status(500).json({
                status : "fail",
                msg :error.toString()
            })
        }
    };

    courseDetailsUpdate = async (req,res)=>{
        try {
            let id = req.params.id;
            let filter = { _id : id };
            let data = await courseDetailsModel.findById({_id:id});
            if(!data) return res.status(404).json({
                status:"fail",
                msg : "Course details not found"
            });
            let reqBody = req.body;
            let update = reqBody;
            let updateData = await courseDetailsModel.findByIdAndUpdate(
                filter, update,{new:true}
            );
            return res.status(200).json({
                status:"success",
                data : updateData
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };

    courseDetailsDelete = async (req,res)=>{
        try {
            let id = req.params.id;
            let filter = {_id : id};
            let data = await courseDetailsModel.findById({_id : id});
            if(!data) return res.status(404).json({
                status:"fail",
                msg : "Course details not found"
            });
            await courseDetailsModel.findByIdAndDelete(filter);
            return res.status(200).json({
                status:"success",
                msg : "Course details delete successful"
            });
            
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };

    getAllCourseDetails = async (req,res)=>{
        try {
            let data = await courseDetailsModel.find();
            if(data.length===0) return res.status(404).json({
                status : "fail",
                msg : "Course details not found"
            });
            return res.status(200).json({
                status:"success",
                data : data
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };
    courseDetailsByCourseId = async (req,res)=>{
        const data = await courseDetailsService.courseDetailsByCourseId(req);
        res.send(data);
    };
    
}

const courseDetailsController = new courseDetailsClass();

module.exports = courseDetailsController;