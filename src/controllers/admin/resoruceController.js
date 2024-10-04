const resourceModel = require("../../models/resourceModel");
const resourceService = require("../../services/resourceService");

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

    update = async (req, res) => {
        try {
            let id = req.params.id;

            let filter = { _id: id };

            let update = req.body;

            let data = await resourceModel.findById(id);

            
            if (!data) return res.status(404).json({
                status: "fail",
                msg: "Resource not found",
            });
            
            const updateData = await resourceModel.findByIdAndUpdate(filter, update, {
                new: true,
            });

            return res.status(200).json({
                status: "success",
                msg: "Resource updated successfully",
                data: updateData,
            });

        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString(),
            });
        }
    };

    resourceDelete = async function(req, res) {
        try {
            let id = req.params.id;
            let filter = { _id: id };
            let data = await resourceModel.findById(id);
            if (!data) return res.status(404).json({
                status: "fail",
                msg: "Resource not found",
            });
            await resourceModel.findByIdAndDelete(filter);
            return res.status(200).json({
                status: "success",
                msg: "Resource deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString(),
            });
        }
    };

    allResource = async function(req,res){
        let data = await resourceService.allResourceService();
        res.send(data);
    };
    singleResourceServiceById = async function(req,res){
        let data = await resourceService.singleResourceService(req);
        res.send(data);
    };

}


const resourceController = new resourceClass;

module.exports = resourceController;