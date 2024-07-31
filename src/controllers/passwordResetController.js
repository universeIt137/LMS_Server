const otpModel = require("../models/otpModel");
const userModel = require("../models/userModel");
const sendEmailUtility = require("../utility/sendEmailUtility");
const jwt = require("jsonwebtoken");
class passwordResetClass {
    sendEmailUser = async (req,res) => {
        try {
            let email = req.params.email;
            const otp = Math.floor(Math.random() * 1000000);
            const emailText = `Your verification code is ${otp}`;
            const emailSubject = `LMS Verification code `;
            const status = 1;
            let userData = await userModel.findOne({email:email});
            const jwtToken = jwt.sign({
                email: email,
                exp: Math.floor(Date.now() / 1000) + (30), // 30 sec
            },process.env.OTP_SECRET);


            if (userData){
                await sendEmailUtility(email,emailText,emailSubject);
                await otpModel.create({
                    otp : otp,
                    token:jwtToken,
                    status:status
                })
                return res.status(200).json({
                    status:"success",
                    data : "6 digit otp code send successfully"
                });
            }else {
                return res.status(404).json({
                    status:"fail",
                    msg:"User not found"
                });
            }
        }catch (e) {
            console.log(e);
            return res.status(500).json({
                status:"fail",
                msg:"something went worng"
            });
        }
    };
    otpVerify = async (req,res)=>{
        try {
            let otpCode = req.body.otp;
            let filter = {
                otp : otpCode
            };
            let userOtpData = await otpModel.findOne(filter);
            if (userOtpData){
                const decodeData = jwt.verify(userOtpData.token, process.env.OTP_SECRET);
                return res.status(200).json({
                    status:"success",
                    data : decodeData
                });
            }else {
                return res.status({
                    status:"fail",
                    msg : "Otp time expired"
                });
            }
        }catch (e) {
            console.log(e)
            return res.status(500).json({
                status:"fail",
                msg :"something went worng"
            });
        }
    };

}


const passwordResetController = new passwordResetClass();

module.exports = passwordResetController;