const express = require("express");

const router = new express.Router();
const {isLogIn,isAdminUser} = require("../middlewares/authMiddleware")

//adminUser controller
const adminUserController = require("../controllers/admin/adminAuthController");

router.delete("/user/delete/:id", isLogIn, isAdminUser, adminUserController.deleteUser);
router.get("/all-user/", isLogIn, isAdminUser, adminUserController.allUser);
router.put("/admin/update", isLogIn,isAdminUser,adminUserController.adminProfileUpdate);








module.exports = router;