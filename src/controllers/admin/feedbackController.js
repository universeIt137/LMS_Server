const feedbackModel = require("../../models/learnerFeedbackModel");

const feedbackService = require("../../services/feedbackService.js")

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
    };

    updateFeedback = async (req,res)=>{
        try {
            let id = req.params.id;
            let filter = {_id : id};
            let reqBody = req.body;
            let update = reqBody;
            let data = await feedbackModel.findById({_id : id});
            if(!data) return res.status(404).json({
                status:"fail",
                msg : "feedback data not found"
            });
            let updateData = await feedbackModel.findByIdAndUpdate(
                filter, update, {new:true}
            );
            return res.status(200).json({
                status:"success",
                msg : "feedback data update successfully",
                data : updateData
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };

    deleteFeedback = async (req,res)=>{
        try {
            let id = req.params.id;
            let filter = {_id : id};
            let data = await feedbackModel.findById({_id : id});
            if(!data) return res.status(404).json({
                status:"fail",
                msg : "feedback data not found"
            });
            await feedbackModel.findByIdAndDelete(
                filter
            );
            return res.status(200).json({
                status:"success",
                msg : "feedback data delete successfully",
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };

    allFeedbackByAdmin = async (req,res)=>{
        let data = await feedbackService.findAllFeedbackService();
        res.send(data);
    }
}

const feedbackController = new feedbackClass();

module.exports = feedbackController;