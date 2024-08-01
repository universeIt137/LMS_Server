const moduleModel = require("../models/moduleModel");
const {parseUserToken} = require("../helper/helper");

class moduleClass {
    moduleCreate = async (req,res)=>{
        let userToken = parseUserToken(req)
        try {
            let reqBody = req.body;
            if (userToken.role==="admin"||userToken.role==="superAdmin"){
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
}


const moduleController = new moduleClass();

module.exports = moduleController;


exports.brandDeleteController = async (req,res)=>{
    let deleteId = new mongoose.Types.ObjectId(req.params.id);
    let associate = await checkAssociate({brandId: deleteId},productModel);
    if (associate){
        res.status(200).send({
            status:"associate",
            msg : "Associate with brand"
        });
    }else {
        let result = await deleteService(req,brandModel);
        console.log(result)
        res.status(200).send(result);
    }
};

const mongoose = require("mongoose");
const deleteService =async (req,dataModel) => {
    try {
        let id = req.params.id;
        let userEmail = req.headers["email"];
        let queryObj = {};
        queryObj["_id"] = id;
        queryObj["userEmail"] = userEmail;
        let data = await dataModel.deleteMany(queryObj);
        return { status:"success",data:data };
    }catch (e) {
        return { status:"fail", msg:e.toString() };
    }
};


module.exports = deleteService;