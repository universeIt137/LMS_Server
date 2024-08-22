const express = require("express");

const router = express.Router();

const userController = require("../controllers/user/userController")

router.post("/user/registration", userController.signUp);
router.get("/user/all/user", userController.allUser);




module.exports = router;