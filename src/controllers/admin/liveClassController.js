const liveClassModel = require("../../models/liveClassModel");

class liveClass {
    create = async (req,res)=>{
        try {
            let reqBody = req.body;
            let data = await liveClassModel.create(reqBody);
            return res.status(201).json({
                status:"success",
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

const liveClassController = new liveClass();

module.exports = liveClassController;