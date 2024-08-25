const express = require("express");

const router = express.Router();

// user controller 
const userController = require("../controllers/user/userController");
// image middleware
const upload = require("../middlewares/imageMiddleware");
const { isLogIn, isLogOut } = require("../middlewares/authMiddleware");

router.post("/user/sign-up", upload.single("img") ,userController.signUp);
router.post("/user/sign-in", isLogOut , userController.singIn);
router.get("/user/log-out", isLogIn ,userController.handleLogOut);
router.get("/single/user", isLogIn, userController.getSingleUser);




module.exports = router;