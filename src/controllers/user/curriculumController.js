const curriculumModel = require("../../models/curriculumModel");


class curriculumClass {
    getAllCurriculum = async (req,res)=>{
        try {
            let data =  await curriculumModel.find();
            if(data.length===0) return res.status(404).json({
                status:"fail",
                msg : "Curriculum not found"
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
}

const curriculumController = new curriculumClass();

module.exports = curriculumController;