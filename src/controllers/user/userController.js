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
            console.log(data);
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
}

const userController = new userClass();

module.exports = userController;