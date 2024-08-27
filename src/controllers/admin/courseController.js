const courseModel = require("../../models/courseModel");

class courseClass {
    courseCreate = async (req,res)=>{
        try {
            let {course_name,course_img,instructor_name,
            instructor_img,total_sit,batch_no} = req.body;
            
            let courseData = {
                course_name : course_name,
                course_img : course_img,
                instructor_name : instructor_name,
                instructor_img : instructor_img,
                total_sit : total_sit,
                batch_no : batch_no
            };

            let data = await courseModel.create(courseData);

            return res.status(201).json({
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

const courseController = new courseClass();

module.exports = courseController;