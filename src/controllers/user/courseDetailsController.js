const courseDetailsModel = require("../../models/courseDetailsModel");

class courseDetailsClass {
    getAllCourseDetails = async(req,res)=>{
        try {
            let data = await courseDetailsModel.find();
            if(data.length===0) return res.status(404).json({
                status:"fail",
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
    }
}

const courseDetailsController = new courseDetailsClass();

module.exports = courseDetailsController;