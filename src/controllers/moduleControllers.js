const moduleModel = require("../models/moduleModel");
const {parseUserToken} = require("../helper/helper");
const checkAssociate = require("../services/checkAssociate");
const deleteService = require("../services/deleteService");
const mongoose = require("mongoose");

class moduleClass {
    moduleCreate = async (req,res)=>{
        let userToken = parseUserToken(req)
        try {
            let reqBody = req.body;
            if (userToken.role==="admin"||userToken.role==="super-admin"){
                let data = await moduleModel.create(reqBody);
                return res.status(201).json({
                    status:"success",
                    data : data
                });
            }else {
                return res.status(403).json({
                    status:"fail",
                    msg : "Permission not allow"
                });
            }
        }catch (e) {
            console.log(e);
            return res.status(500).json({
                status:"fail",
                msg : "something went worng"
            });
        }
    };
    moduleUpdate = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let id = req.params.id;
            let filter = { _id : id };
            let reqBody = req.body;
            if (userToken.role==="superAdmin"){
                await moduleModel.findByIdAndUpdate(filter,reqBody);
                return res.status(200).json({
                    status:"success",
                    msg : "Module update successfully"
                });
            }else {
                return res.status(403).json({
                    status:"fail",
                    msg : "Permission not allow"
                });
            }
        }catch (e) {
            return res.status(500).json({
                status:"fail",
                data : "Internal server error"
            });
        }
    };
    
    moduleDelete = async (req,res)=>{
        try {
            let deleteId = new mongoose.Types.ObjectId(req.params.id)
            const check = await checkAssociate({_id: deleteId},)
        }catch (e) {

        }
    };
}


const moduleController = new moduleClass();

module.exports = moduleController;
