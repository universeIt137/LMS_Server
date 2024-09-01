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

    assignmentUpdate = async (req,res)=>{
        try {
            let id = req.params.id;
            let filter = { _id : id };
            let reqBody = req.body;
            let update = reqBody;
            let data = await assignmentModel.findById({_id : id});
            if(!data) return res.status(404).json({
                status:"fail",
                msg : "Assignment not found"
            });
            let updateData = await assignmentModel.findByIdAndUpdate(
                filter,update,{new:true}
            );
            return res.status(200).json({
                status:"success",
                msg : "Assignment update successfully",
                data : updateData
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };

    assignmentDelete = async (req, res) => {
        try {
            let id = req.params.id;
            
            // Check if the assignment exists
            let data = await assignmentModel.findById(id);
            if (!data) {
                return res.status(404).json({
                    status: "fail",
                    msg: "Assignment not found"
                });
            }
    
            // If assignment exists, proceed to delete
            await assignmentModel.findByIdAndDelete(id);
            return res.status(200).json({
                status: "success",
                msg: "Assignment deleted successfully"
            });
    
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString()
            });
        }
    };
    
    allAssignmentByAdmin = async (req,res)=>{
        
    }
    

}

const assignmentController = new assignmentClass();

module.exports = assignmentController;