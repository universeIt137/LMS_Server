const userModel = require("../../models/userModel");


class adminUserClass {
    deleteUser = async (req,res)=>{
        try {
            let id = req.params.id;
            let  filter = { _id : id };
            await userModel.findByIdAndDelete(filter);
            if(!data){
                return res.status(404).json({
                    status:"fail",
                    msg : "User not found"
                });
            }else {
                return res.status(200).json({
                    status:"fail",
                    msg : "User delete successfully"
                });
            }
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };
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
    adminProfileUpdate = async (req,res)=>{
        try {
            let id = req.user._id;
            let filter =  { _id : id };
            let {name,email,phone_number,img} = req.body;
            const update = {
                name : name,
                email : email,
                phone_number:phone_number,
                img : img
            }
            let data = await userModel.findById({_id : id});
            if(!data) return res.status(404).json({
                status:"fail",
                msg : "Admin data not found"
            })
            let userData = await userModel.findByIdAndUpdate(
                filter,
                update,
                {new:true}
            );
            return res.status(200).json({
                status:"success",
                data : userData
            });
        } catch (error) {
            return res.status(500).json({
                status:"success",
                msg : error.toString()
            });
        };
    }
}

const adminUserController = new adminUserClass();

module.exports = adminUserController;