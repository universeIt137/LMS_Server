const otpModel = require("../models/otpModel");
const userModel = require("../models/userModel");
const sendEmailUtility = require("../utility/sendEmailUtility");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class passwordResetClass {
    sendEmailUser = async (req,res) => {
        try {
            const email = req.params.email;
            const code =  Math.floor(Math.random() * 999999);

            const emailText = `Your verification code is: ${code}`;
            const emailSub = "Your verification";
            let status = 0

            // Check if the email exists in userModel
            const user = await userModel.findOne({ email });

            if (user) {
                // Send email
                await sendEmailUtility(email, emailText, emailSub);

                // Find the existing OTP or create a new one
                const otp = await otpModel.findOneAndUpdate(
                    { email },
                    { $set: { otp: code,status:status    } },
                    { upsert: true, new: true }
                );

                res.status(200).json({
                    status: "success",
                    message: "6-digit OTP has been sent",
                    data: otp,
                });
            } else {
                res.status(404).json({
                    status: "fail",
                    message: "Email not found",
                });
            }
        } catch (error) {
            res.status(500).json({
                status: "fail",
                message: error.toString(),
            });
        }
    };



}


const passwordResetController = new passwordResetClass();

module.exports = passwordResetController;