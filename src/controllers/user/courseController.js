const courseModel = require("../../models/courseModel");

class courseClass {
    getAllCourse = async (req,res)=>{
        try {
            let data = await courseModel.find();
            if(data.length===0) return res.status(404).json({
                status:"fail",
                msg : "Course not found"
            });
            return res.status(200).json({
                status:"success",
                data : data
            });
        } catch (error) {
            return res.status(500).json({
                status : "fail",
                msg : error.toString()
            });
        }
    };
}

const courseController =new courseClass();

module.exports = courseController;