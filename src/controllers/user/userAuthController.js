require("dotenv").config;
const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const { createWebToken } = require("../../helper/jsonWebTokenHelper");
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
const jwt = require("jsonwebtoken");

const cloudHelper = require("../../helper/cloudinaryHelper");

class userClass {
  signUp = async (req, res) => {
    try {
      const { firstName, password, email, username, lastName } = req.body;

      let userEmail = await userModel.findOne({ email: email });

      if(userEmail) return res.status(409).send({
        status: "fail",
        msg: "Email already exists",
      })

      let profileImage = "";
      if (req.file) {
        const result = await cloudHelper.uploader.upload(req.file.path, {
          folder: "user-profile_pics", 
        });
        profileImage = result.secure_url;
      }
      
      let newUser = new userModel({
        firstName,
        lastName,
        username,
        email,
        password,
        id: `${Math.floor(100000 + Math.random() * 900000)}`,
        profile_pick : profileImage
      });

      await newUser.save();

      return res.status(201).json({
        status: "success",
        msg: `${username} your account has been successfully created`,
        data : newUser
      });

    } catch (error) {
      console.error(error.toString());
      return res.status(500).json({
        status: "fail",
        msg: error.toString(),
      });
    }
  };

  singIn = async (req, res) => {
    try {
      let { email, password } = req.body;
      let user = await userModel.findOne({ email: email });
      if (!user)
        return res.status(404).json({
          status: "fail",
          msg: "User not exists in this email",
        });
      let matchPassword = bcrypt.compareSync(password, user.password);
      if (!matchPassword) {
        return res.status(403).json({
          status: "fail",
          msg: "password not match",
        });
      }

      // crate access token
      const accessTokenKey = process.env.ACCESS_TOKEN_KEY;

      let token = createWebToken({ user }, accessTokenKey, "7d");

      res.cookie("accessToken", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      // refresh token
      const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;

      const refreshToken = createWebToken({ user }, refreshTokenKey, "15d");

      res.cookie("refreshToken", refreshToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return res.status(200).json({
        role : `${user.role}`,
        token: token,
        status: "success",
        msg: ` ${user.role} login successfully`,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        msg: error.toString(),
      });
    }
  };


  handleLogOut = async (req, res) => {
    try {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return res.status(200).json({
        status: "success",
        msg: "User logout successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        msg: e.toString(),
      });
    }
  };


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
          msg: "Unauthorized user, please login",
        });
      }

      // Create a new access token
      const accessToken = createWebToken(
        { user: oldTokenVerify.user },
        accessTokenKey,
        "7d"
      );

      // Set the new access token in cookies
      res.cookie("accessToken", accessToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return res.status(200).json({
        status: "success",
        msg: "Token created",
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        msg: error.toString(),
      });
    }
  };

  getUserProfile = async (req, res) => {
    try {
      let id = req.headers["_id"];
      let filter = { _id: id };
      const notPassword = { password: 0 };
      let data = await userModel.findOne(filter, notPassword);
      if (!data) {
        return res.status(404).json({
          status: "fail",
          msg: "User not found",
        });
      } else {
        return res.status(200).json({
          status: "success",
          data: data,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        msg: error.toString(),
      });
    }
  };

  updateUserProfile = async (req, res) => {
    try {
      let id = req.headers["_id"];
      let filter = { _id: id };

      let { firstName,lastName,username } = req.body;

      let profileImage = "";
      if (req.file) {
        const result = await cloudHelper.uploader.upload(req.file.path, {
          folder: "user-profile_pics", 
        });
        profileImage = result.secure_url;
      }

      const update = {
        firstName,
        lastName,
        username,
        profile_pick: profileImage,
      };

      let data = await userModel.findById({ _id: id });


      if (!data) {
        return res.status(404).json({
          status: "fail",
          msg: "User not found",
        });
      } else {
        let data = await userModel.findByIdAndUpdate(filter, update, {
          new: true,
        });
        return res.status(200).json({
          status: "success",
          msg : `Profile updated successfully`,
          data: data,
        });
      }

    } catch (error) {
      return res.status(500).json({
        status: "fail",
        msg: error.toString(),
      });
    }
  };
}

const userController = new userClass();

module.exports = userController;
