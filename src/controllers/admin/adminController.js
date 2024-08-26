const userModel = require("../../models/userModel");


class adminUserClass {
    allUser = async (req,res)=>{
        try {
            let data = await userModel.find();
            if(!data){
                return res.status(404).json({
                    status:"fail",
                    msg : "Users not found"
                });
            }else{
                return res.status(200).json({
                    status:"fail",
                    data : data
                });
            }
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg: error.toString()
            });
        }
    };
}

const adminUserController = new adminUserClass();

module.exports = adminUserController;