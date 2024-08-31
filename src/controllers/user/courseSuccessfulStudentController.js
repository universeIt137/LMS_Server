const courseSuccessfulStudentModel = require("../../models/successfullStudentModel");

// courseSuccessfulStudentService
const courseSuccessfulStudent = 
require("../../services/curseSuccessfulStudentService");

class courseSuccessfulStudentClass {
    allSuccessfulStudent = async (req,res)=>{
        let data = await courseSuccessfulStudent()
        res.send(data);
    }
}

const courseSuccessfulStudentController = new courseSuccessfulStudentClass();

module.exports = courseSuccessfulStudentController;