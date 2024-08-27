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
    courseUpdate = async (req,res)=>{
        try {
            let id = req.params.id;
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
            let filter = {_id : id};
            let update = courseData;
            let data = await courseModel.findById({_id : id});
            if(!data) return res.status(404).json({
                status:"fail",
                msg : "Course not found"
            });
            let updateData = await courseModel.findByIdAndUpdate
            (filter,update,{new:true});

            return res.status(200).json({
                status:"success",
                data : updateData
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };
    courseDelete = async (req,res)=>{
        try {
            let id = req.params.id;
            let filter = {_id:id};
            let data = await courseModel.findById({_id : id});
            if(!data) return res.status(404).json({
                status:"fail",
                msg : "Course not found"
            });
            await courseModel.findByIdAndDelete(filter);
            return res.status(200).json({
                status:"success",
                msg : "Course delete successfully"
            });
        } catch (error) {
            return res.status({
                status:"fail",
                msg : error.toString()
            });
        }
    };
    allCourseByAdmin = async (req,res)=>{
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
                status:"fail",
                msg : error.toString()
            });
        }
    }

}

const courseController = new courseClass();

module.exports = courseController;