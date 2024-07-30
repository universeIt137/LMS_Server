const signUpModel = require("../models/signUpModel");
const bcrypt = require('bcrypt');
const {has} = require("express-mongo-sanitize");
const saltRounds = 10;
class signUpClass {
    signUp = async (req,res)=>{
        try {
            let userData = req.body;
            userData.role = "student";
            let {name,email,phone_number,password,img} = req.body;

            let userEmail = await signUpModel.findOne({email:email});
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
                    const newUser = new signUpModel({
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

}

const signUpController = new signUpClass();
module.exports = signUpController;