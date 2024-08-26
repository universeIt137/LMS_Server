require("dotenv");
const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const {createWebToken} = require("../../helper/jsonWebTokenHelper");
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;

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
    
    singIn = async (req,res)=>{
        try {
            let {email,password} = req.body;
            let user = await userModel.findOne({email:email});
            if(!user) return res.status(404).json({
                status : "fail",
                msg : "User not exists in this email"
            });
            let matchPassword = bcrypt.compareSync(password,user.password);
            if(!matchPassword){
                return res.status(403).json({
                    status : "fail",
                    msg : "password not match"
                });
            }

            console.log(user);

            // crate access token

            let token = createWebToken(
                {user},
                accessTokenKey,
                "20m"
            );

            console.log(`token is ${token}`);

            res.cookie("accessToken",token,{
                maxAge : 20*60*1000,
                httpOnly : true,
                secure : true,
                sameSite : "none"
            });

            // refresh token

            const refreshToken = createWebToken(
                {user},
                refreshTokenKey,
                "7d"
            );

            console.log(`refresh token is ${refreshToken}`)

            res.cookie("refreshToken", refreshToken,{
                maxAge : 7*24*60*60*1000,
                httpOnly : true,
                secure : true,
                sameSite : "none"
            });

            return res.status(200).json({
                status:"success",
                msg : "User login successfully"
            });

        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg :  error.toString()
            })
        }
    };

    handleLogOut = async (req,res)=>{
        try {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return res.status(200).json({
                status:"success",
                msg : "User logout successfully"
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : e.toString()
            });
        }
    }

    getSingleUser = async (req, res) => {
        try {
            let id = req.user._id;
            let filter = { _id: id };
            const notPassword = {  password:0 };
            let data = await userModel.findOne(filter,notPassword); 
            if (!data) {
                return res.status(404).json({
                    status: "fail",
                    msg: "User not found"
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    data: data
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString()
            });
        }
    };
    

}

const userController = new userClass();

module.exports = userController;