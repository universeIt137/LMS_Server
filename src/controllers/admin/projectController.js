const projectModel = require("../../models/projectModel");

class projectClass {
    createProject = async (req,res)=>{
        try {
            let reqBody = req.body;
            let data = await projectModel.create(reqBody);
            return res.status(201).json({
                status:"success",
                msg : "project create successfully",
                data : data
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };
    updateProject = async (req,res)=>{
        try {
            let id = req.params.id;
            let filter = {_id : id};
            let reqBody = req.body;
            let update = reqBody;
            let data = await projectModel.findById({_id : id});
            if(!data) return res.status(404).json({
                status : "fail",
                msg : "Project data not found"
            });
            let updateData = await projectModel.findByIdAndUpdate
            (filter,update,{new:true});
            return res.status(200).json({
                status:"success",
                msg : "Project data update successfully",
                data : updateData
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    }
}

const projectController = new projectClass();

module.exports = projectController;