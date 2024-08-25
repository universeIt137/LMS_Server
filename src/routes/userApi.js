const express = require("express");

const router = express.Router();

// user controller 
const userController = require("../controllers/user/userController");
// image middleware
const upload = require("../middlewares/imageMiddleware");

router.post("/user/sign-up", upload.single("img") ,userController.signUp);
router.get("/user/all/user", userController.allUser);
router.put("/user/update/:id" , userController.updateUser);




module.exports = router;