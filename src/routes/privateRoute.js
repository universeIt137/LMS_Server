const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signUpControllers");
const authMiddleware = require("../middleware/authMiddleware");

// router.put("/update-user/id", authMiddleware.isValidUser, signUpController.updateUser);

module.exports = router;
