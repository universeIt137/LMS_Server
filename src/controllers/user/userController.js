const userModel = require("../../models/userModel");

class userClass {
    signUp = async (req, res) => {
        try {
            const { name, email, phone_number, password,img } = req.body;
            const userEmail = await userModel.findOne({ email });
            const phoneNumber = await userModel.findOne({ phone_number });
            if (userEmail) {
                return res.status(409).json({ status : "fail", msg : "User email already exists" });
            }
            if (phoneNumber) {
                return res.status(409).json({ status : "fail", msg : "Phone number already exists" });
            }
            // Generate a random 6-digit ID
            const userId = Math.floor(100000 + Math.random() * 900000);
            let reqBodyData = {
                name,
                email,
                phone_number,
                password,
                img,
                id : userId
            };
            // Save the user and return success response
            const data = await userModel.create(reqBodyData);
            return res.status(201).json({ status : "success", data : data });
        } catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
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
            console.log(id)
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