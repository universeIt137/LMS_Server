const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {parseToken, parseUserToken} = require("../helper/helper")
const mongoose = require("mongoose");
const saltRounds = 10;
class signUpClass {
    signUp = async (req,res)=>{
        try {
            let userData = req.body;
            userData.role = "student";
            let {name,email,phone_number,password,img} = req.body;

            let userEmail = await userModel.findOne({email:email});
            if (!name){
                return res.status(400).json({
                    status:"fail",
                    msg : "User name required"
                });
            }else if(!email){
                return res.status(400).json({
                status:"fail",
                msg : "User email required"
            });
            }else if (!phone_number){
                return res.status(400).json({
                    status:"fail",
                    msg : "User phone number required"
                });
            }else if (!password){
                return res.status(400).json({
                    status:"fail",
                    msg : "User  password required"
                });
            }else if(!img){
                return res.status(400).json({
                    status:"fail",
                    msg : "User  img required"
                });
            }
            else if (userEmail){
                return res.status(409).json({
                    status:"fail",
                    msg : "User email already exists"
                })
            }else {
                bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
                    const newUser = new userModel({
                        name : req.body.name,
                        email : req.body.email,
                        password : hash,
                        phone_number : req.body.phone_number,
                        img : req.body.img,
                        role : req.body.role
                    });
                    await newUser.save();
                    return res.status(201).json({
                        status:"success",
                        data : newUser
                    });
                });
            }
        }catch (e) {
            console.log(e);

            res.status(500).json({
                status:"fail",
                msg : "Internal server error"
            })

        }
    };

    login = async (req,res)=>{
        try {
            require("dotenv").config();
            const key = process.env.AUTH_SECRET;
            let password = req.body.password;
            let email = req.body.email;
            let user = await userModel.findOne({email:email});
            if(!user){
                return res.status(404).json({
                    status:"fail",
                    msg:"User not found"
                });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            let payload = {
                id : user._id,
                role : user.role,
                email : user.email,
                exp: Math.floor(Date.now() / 1000 + 24 * 60 * 60),
            }
            const token = jwt.sign(payload,key);
            if (isMatch){
                return res.status(201).json({
                    status:"success",
                    token : token
                });
            }else {
                return res.status(404).json({
                    status:"fail",
                    msg:"User not found"
                });
            }
        }catch (e) {
            console.log(e)

        }
    };

    updateUser = async (req,res)=>{
        try {
            let id = req.params.id;
            let matchStage = {
                _id : id
            }
            let name = req.body.name;
            let email = req.body.email;
            let img = req.body.img;
            await userModel.findByIdAndUpdate(matchStage,{name:name,email:email,img:img});
            return res.status(200).json({
                status : "success",
                data : "User Data Update Successfully"
            });
        }catch (e) {
            return res.status(500).json({
                status:"fail",
                msg : "Something went worng"
            });
        }
    };

    deleteUser = async (req,res)=>{
        try {
            let id = req.params.id;
            let filter = {
                _id : id
            };
            const userData = await userModel.findOne(filter);
            if (!userData) return res.status(404).send({
                status:"fail",
                msg:"User data not found"
            });

            if ((userData.role==="admin")||(userData.role==="superAdmin")){
                await signUpModel.findByIdAndDelete(filter);
                return res.status(200).json({
                    status : "success",
                    msg : "User data delete successfully"
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : "You have not allow permission "
                })
            }

        }catch (e) {
            return res.status(500).json({
                status : 'fail',
                msg : "Something went worng"
            });
        }
    };

     singleUser = async (req, res) => {
        const userToken = parseUserToken(req);
        const authEmail = userToken.email;
        try {
            let filter = {email : authEmail};
            let userData = await userModel.findOne(filter);
            if (userData) {
                return res.status(200).json({
                    status: "success",
                    data: userData
                });
            } else {
                return res.status(404).json({
                    status: "fail",
                    msg: "Single user data not found"
                });
            }
        } catch (e) {
            return res.status(500).json({
                status: "fail",
                msg: "something went wrong"
            });
        }
    };

     allUser = async (req, res) => {
         try {
             let userToken = parseUserToken(req);
             if ((userToken.role==="admin")||(userToken.role==="superAdmin")){
                 let data = await userModel.find();
                 return res.status(200).json({
                     status :  "success",
                     data : data
                 });
             }else {
                 return res.status(403).json({
                     status:"fail",
                     msg : "Permission not allow"
                 });
             }
         }catch (e) {
             return res.status(500).json({
                 status:"fail",
                 msg:"something went worng"
             });

         }
     };


}

const signUpController = new signUpClass();
module.exports = signUpController;