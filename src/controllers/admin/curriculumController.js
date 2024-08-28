const curriculumModel = require("../../models/curriculumModel");

class curriculumClass {
    createCurriculum = async (req,res)=>{
        try {
            let {reqBody} = req.body;
            const data = await curriculumModel.create(reqBody);
            return res.status(201).json({
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

let curriculumController = new curriculumClass();


module.exports = curriculumController;
