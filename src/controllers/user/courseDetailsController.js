const courseDetailsModel = require("../../models/courseDetailsModel");
const SingleCourseDetailsService = require("../../services/singleCourseDetailsService")

class courseDetailsClass {
    getAllCourseDetails = async(req,res)=>{
        try {
            let data = await SingleCourseDetailsService.singleCourseDetailsService()
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
    };
    getSingleCourseDetails = async (req,res)=>{
        let data = await SingleCourseDetailsService.singleCourseDetailsService(req);
        res.send(data);
    };
}

const courseDetailsController = new courseDetailsClass();

module.exports = courseDetailsController;