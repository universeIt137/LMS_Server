const feedbackService = require("../../services/feedbackService.js");
const feedbackModel = require("../../models/learnerFeedbackModel.js");


class feedbackClass {
    allFeedback = async (req,res)=>{
        try {
            let data = await feedbackModel.find();
            if(data.length===0) return res.status(404).json({
                status : "fail",
                msg : "Feedback data not found"
            });
            return res.status(200).json({
                status:"success",
                msg : "all data find successfully ",
                data : data
            })
        } catch (error) {
            return res.status({
                status: "fail",
                msg: error.message
            });
        }
    }
}

const feedbackController = new feedbackClass();

module.exports = feedbackController;