const projectModel = require("../../models/projectModel");

class projectClass {
    getAllProject = async (req,res)=>{
        try {
            let data = await projectModel.find();
            if(data.length===0) return res.status(404).json({
                status:"fail",
                msg : "Project data not found"
            });
            return res.status(200).json({
                status:"success",
                msg : "find all project data successfully",
                data : data
            })
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