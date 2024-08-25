const express = require("express");

const router = express.Router();

// user controller 
const userController = require("../controllers/user/userController");
// image middleware
const upload = require("../middlewares/imageMiddleware");

router.post("/user/sign-up", upload.single("img") ,userController.signUp);
router.post("/user/sign-in", userController.singIn);
router.put("/user/update/:id" , userController.updateUser);
router.get("/user/log-out", userController.handleLogOut);




module.exports = router;