const userModel = require("../../models/userModel");

class userClass {
    signUp =  (req,res)=>{
        try {
            let reqBody = req.body;
            console.log(reqBody);
            let data = userModel.create(reqBody);
            return res.status(201).json({
                status : 'success',
                data : data
            })
        } catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };

    allUser = async (req,res)=>{
        try {
            res.send("get method")
            
        } catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };
}

const userController = new userClass();

module.exports = userController;