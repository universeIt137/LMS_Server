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
}

const projectController = new projectClass();

module.exports = projectController;