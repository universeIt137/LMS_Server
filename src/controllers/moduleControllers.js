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
}


const moduleController = new moduleClass();

module.exports = moduleController;
