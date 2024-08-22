const userModel = require("../../models/userModel");

class userClass {
    signUp = async (req,res)=>{
        try {
        let reqBody = req.body;
        console.log(reqBody);
        let data = await userModel.create(reqBody);
        return res.status(201).json({
            status:"success",
            data : data
        })
        } catch (error) {
            console.log(error);
            
        }
    };

    allUser = async (req,res)=>{
        try {
            let data = await userModel.find();
            return res.status(200).json({
                status :"success",
                data : data
            })
            
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };

    updateUser = async (req,res)=>{
        try {
            let reqBody = req.body;
            let id = req.params.id;
            let filter = { _id : id };
            await userModel.findByIdAndUpdate(filter,reqBody);
            return res.status(200).json({
                status : "success",
                msg :"update successfully"
            })
        } catch (e) {
            
        }
    }

}

const userController = new userClass();

module.exports = userController;