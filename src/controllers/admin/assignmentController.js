const assignmentModel = require("../../models/assignmentModel");

class assignmentClass {
    assignmentPost = async (req,res)=>{
        try {
            let reqBody = req.body;
            let data = await assignmentModel.create(reqBody);
            return res.status(201).json({
                status:"success",
                msg : "Assignment post successfully",
                data : data
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };
}

const assignmentController = new assignmentClass();

module.exports = assignmentController;