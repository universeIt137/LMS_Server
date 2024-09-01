const moduleDetailsModel = require("../../models/moduleDetailsModel");

class moduleDetailsClass {
    create = async (req,res)=>{
        try {
            let reqBody = req.body;
            let data = await moduleDetailsModel.create(reqBody);
            return res.status(201).json({
                status : "success",
                msg : "Module details created",
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

const moduleDetailsController = new moduleDetailsClass();

module.exports = moduleDetailsController;