const express = require("express");

const router = express.Router();

// user controller 
const userController = require("../controllers/user/userAuthController");
// image middleware
const upload = require("../middlewares/imageMiddleware");
//middleware
const { isLogIn, isLogOut } = require("../middlewares/authMiddleware");
//course controller
const courseController = require("../controllers/user/courseController")

// auth related api

router.post("/user/sign-up", upload.single("img") ,userController.signUp);
router.post("/user/sign-in", isLogOut , userController.singIn);
router.get("/user/log-out", isLogIn ,userController.handleLogOut);
router.get("/single/user", isLogIn, userController.getSingleUser);
router.put("/user/update", isLogIn, userController.updateUser);
router.get("/refresh-token", userController.handleRefreshToken);

// course related api

router.get("/all-course", courseController.getAllCourse);




module.exports = router;