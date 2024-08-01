const instructorModel = require("../models/instructorModel");
const {parseUserToken} = require("../helper/helper");

class instructorClass  {
    instructorCreate = async (req,res)=>{
        const userToken = parseUserToken(req);
        try {
            let reqBody = req.body;
            if (userToken.role==="superAdmin"){
                let data = await instructorModel.create(reqBody);
                return res.status(201).json({
                    status:"success",
                    data : data
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : "Permission not allow"
                });
            }

        }catch (e) {
            return res.status(500).json({
                status:"fail",
                msg:"Something went worng"
            });
        }
    };
}

const instructorController = new instructorClass();
module.exports = instructorController;