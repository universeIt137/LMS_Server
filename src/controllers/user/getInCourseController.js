const getInCourseModel = require("../../models/getInCourseModel");


class getInCourseClass {
    
allGetInCourse = async (req,res)=>{
        try {
            let data = await getInCourseModel.find();
            if(data.length===0) return res.status(404).json({
                status : "fail",
                msg : "getInCourse data not found"
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
    };
}

const getInCourseController = new getInCourseClass();


module.exports = getInCourseController;