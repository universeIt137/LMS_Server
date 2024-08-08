const courseModel = require("../models/courseModel");
const {parseUserToken} = require("../helper/helper");

class courseClass  {
    courseCreate = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let {course_name,instructor_name,instructor_img,total_sit,batch_no} = req.body;
            const reqBody = req.body;
            if (!course_name){
                return res.status(400).json({
                    status:"fail",
                    msg : "course name required"
                });
            }else if (!instructor_name){
                return res.status(400).json({
                    status:"fail",
                    msg : "instructor name required"
                });
            }else if (!instructor_img){
                return res.status(400).json({
                    status:"fail",
                    msg : "instructor img required "
                });
            }else if (!total_sit){
                return res.status(400).json({
                    status:"fail",
                    msg : "total_sit  required"
                });
            }else if (!batch_no){
                return res.status(400).json({
                    status:"fail",
                    msg : "batch_no  required"
                });
            }
            else {
                if (userToken.role==="admin" || userToken.role==="super-admin"){
                    const data = await courseModel.create(reqBody);
                    return res.status(201).json({
                        status : "success",
                        data :data
                    });
                }else {
                    return res.status(403).json({
                        status : "fail",
                        msg :"Permission not allow"
                    });
                }
            }
        }catch (e) {
            console.log(e);
            return res.status(500).json({
                status : "fail",
                msg :"Internal server error"
            });
        }
    };
}


const courseController = new courseClass();

module.exports = courseController;