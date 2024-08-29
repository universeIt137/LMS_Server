const instructorModel = require("../../models/instructorModel");

class instructorClass {
    create = async (req,res)=>{
        try {
            let reqBody = req.body;
            let data = await instructorModel.create(reqBody);
            return res.status(201).json({
                status:"success",
                msg : "create successfully",
                data : data
            })
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };

    updateInstructor = async (req,res)=>{
        try {
            let id = req.params.id;
            let filter = {_id : id};
            let reqBody = req.body;
            let update = reqBody;
            let data = await instructorModel.findById({_id : id});
            if(!data) return res.status(404).json({
                status:"fail",
                msg :"Instructor data not found"
            });
            let updateData = await instructorModel.findByIdAndUpdate
            (filter,update,{new:true});
            return res.status(200).json({
                status:"success",
                msg :"Instructor data update successfully",
                data : updateData
            })
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };

    deleteInstructor = async (req,res)=>{
        try {
            let id = req.params.id;
            let filter = {_id : id};
            let data = await instructorModel.findById({_id : id});
            if(!data) return res.status(404).json({
                status:"fail",
                msg :"Instructor data not found"
            });

            await instructorModel.findByIdAndDelete(filter);
            return res.status(200).json({
                status:"success",
                msg :"Instructor data delete successfully",
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };

    allInstructorByAdmin = async (req,res)=>{
        try {
            let data = await instructorModel.find();
            if(data.length===0) return res.status(404).json({
                status:"fail",
                msg : "Instructor not found"
            });
            return res.status(200).json({
                status:"success",
                msg : "find all instructor data " ,
                data : data
            })
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };
}

const instructorController = new instructorClass();

module.exports = instructorController;