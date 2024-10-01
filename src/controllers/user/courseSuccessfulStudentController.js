const courseSuccessfulStudentModel = require("../../models/successfullStudentModel");

// courseSuccessfulStudentService
const courseSuccessfulStudent = 
require("../../services/curseSuccessfulStudentService");

class courseSuccessfulStudentClass {
    allSuccessfulStudent = async (req,res)=>{
        try {
            let data = await courseSuccessfulStudentModel.find();
            if(data.length===0) return res.status(404).json({
                status : "fail",
                msg : "Successful Student data not found"
            });
            return res.status(200).json({
                status:"success",
                msg : "all data find successfully ",
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

const courseSuccessfulStudentController = new courseSuccessfulStudentClass();

module.exports = courseSuccessfulStudentController;