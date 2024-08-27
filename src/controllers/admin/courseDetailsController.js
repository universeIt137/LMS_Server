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
}

const courseDetailsController = new courseDetailsClass();

module.exports = courseDetailsController;