const userModel = require("../../models/userModel");

class userClass {
    signUp =  (req,res)=>{
        try {
        let reqBody = req.body;
        console.log(reqBody);
        let data =  userModel.create(reqBody);
        return res.status(201).json({
            status:"success",
            data : data
        })
        } catch (error) {
            console.log(error);
            
        }
    };

    allUser =  (req,res)=>{
        try {
            let data =  userModel.find();
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