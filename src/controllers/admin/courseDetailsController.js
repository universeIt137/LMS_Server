const courseDetailsModel = require("../../models/courseDetailsModel");

class courseDetailsClass {
    courseDetailsCreated = async (req,res)=>{
        try {
            let reqBody = req.body;
            let data = await courseDetailsModel.create(reqBody);
            return res.status(201).json({
                status:"success",
                data : data
            });
        } catch (error) {
            return res.status(500).json({
                status : "fail",
                msg :error.toString()
            })
        }
    };

    courseDetailsUpdate = async (req,res)=>{
        try {
            let id = req.params.id;
            let filter = { _id : id };
            let data = await courseDetailsModel.findById({_id:id});
            if(!data) return res.status(404).json({
                status:"fail",
                msg : "Course details not found"
            });
            let reqBody = req.body;
            let update = reqBody;
            let updateData = await courseDetailsModel.findByIdAndUpdate(
                filter, update,{new:true}
            );
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
}

const courseDetailsController = new courseDetailsClass();

module.exports = courseDetailsController;