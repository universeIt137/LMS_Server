const resourceModel = require("../../models/resourceModel");

class resourceClass {
    create = async(req,res)=>{
        try {
            let reqBody = req.body;
            let data = await resourceModel.create(reqBody);
            return res.status(201).json({
                status:"success",
                msg : "Resource created successfully",
                data : data
            });
        } catch (error) {
            return res.status(500).json({
                status : "fail",
                msg : error.toString()
            });
        }
    };
}


const resourceController = new resourceClass;

module.exports = resourceController;