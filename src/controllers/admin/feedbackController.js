const feedbackModel = require("../../models/learnerFeedbackModel");

class feedbackClass {
    createFeedback = async (req,res)=>{
        try {
            let reqBody = req.body;
            let data = await feedbackModel.create(reqBody);
            return res.status(201).json({
                status:"success",
                msg : "feedback create successfully",
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

const feedbackController = new feedbackClass();

module.exports = feedbackController;