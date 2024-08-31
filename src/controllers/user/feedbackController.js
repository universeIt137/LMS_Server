const feedbackService = require("../../services/feedbackService.js");


class feedbackClass {
    allFeedback = async (req,res)=>{
        let data = await feedbackService.findAllFeedbackService();
        res.send(data);
    }
}

const feedbackController = new feedbackClass();

module.exports = feedbackController;