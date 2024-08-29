const successfulStudentModel = require("../../models/successfullStudentModel");

class successfulStudentClass {
    create = async (req,res)=>{
        try {
            let reqBody = req.body;
            let data = await successfulStudentModel.create(reqBody);
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
}

const successfulStudentController = new successfulStudentClass();

module.exports= successfulStudentController;