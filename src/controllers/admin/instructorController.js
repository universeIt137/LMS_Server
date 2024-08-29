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
}

const instructorController = new instructorClass();

module.exports = instructorController;