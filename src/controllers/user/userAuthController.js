require("dotenv");
const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const {createWebToken} = require("../../helper/jsonWebTokenHelper");
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
const jwt = require("jsonwebtoken");

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

            // crate access token
            const accessTokenKey = process.env.ACCESS_TOKEN_KEY;

            let token = createWebToken(
                {user},
                accessTokenKey,
                "20m"
            );

            res.cookie("accessToken",token,{
                maxAge : 20*60*1000,
                httpOnly : true,
                secure : true,
                sameSite : "none"
            });

            // refresh token
            const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;

            const refreshToken = createWebToken(
                {user},
                refreshTokenKey,
                "7d"
            );

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
            console.log(error);
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

    handleRefreshToken = async (req, res) => {
        const refreshTokenKey = process.env.REFRESH_TOKEN_KEY; 
        const accessTokenKey = process.env.ACCESS_TOKEN_KEY; 
        try {
            const oldToken = req.cookies.refreshToken;
    
            // Verify the old refresh token
            const oldTokenVerify = jwt.verify(oldToken, refreshTokenKey);

    
            if (!oldTokenVerify) {
                return res.status(401).json({
                    status: "fail",
                    msg: "Unauthorized user, please login"
                });
            }
    
            // Create a new access token
            const accessToken = createWebToken(
                {"user": oldTokenVerify.user },
                accessTokenKey,
                "20m"
            );
    
            // Set the new access token in cookies
            res.cookie("accessToken", accessToken, {
                maxAge: 20 * 60 * 1000, // 20 minutes
                httpOnly: true,
                secure: true,
                sameSite: "none"
            });
    
            return res.status(200).json({
                status: "success",
                msg: "Token created"
            });
    
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString()
            });
        }
    };

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

    updateUser = async (req,res)=>{
        try {
            let id = req.user._id;
            let filter = {_id : id};
            let {name,email,phone_number,img} = req.body;
            const update = {
                name : name,
                email : email,
                phone_number : phone_number,
                img : img
            }
            let data = await userModel.findById({_id : id});
            if(!data){
                return res.status(404).json({
                    status:"fail",
                    msg : "User not found"
                });
            }else{
                let data = await userModel.findByIdAndUpdate(filter,update,{new:true});
                return res.status(200).json({
                    status:"success",
                    data : data
                })
            }
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };
    

}

const userController = new userClass();

module.exports = userController;