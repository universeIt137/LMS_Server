const preRecordModel = require("../../models/preRecordVideoModel");


class preRecordClass {
    create = async (req,res)=>{
        try {
            let reqBody = req.body;
            let data = await preRecordModel.create(reqBody);
            return res.status(201).json({
                status:"success",
                msg : "Upload video successfully",
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


const preRecordVideoController = new preRecordClass();

module.exports = preRecordVideoController;