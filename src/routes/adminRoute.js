const express = require("express");

const router = new express.Router();
const {isLogIn,isAdmin} = require("../middlewares/authMiddleware")

//adminUser controller
const adminUserController = require("../controllers/admin/adminAuthController");

router.delete("/user/delete/:id", isLogIn, isAdmin, adminUserController.deleteUser);
router.get("/all-user", isLogIn, isAdmin, adminUserController.allUser);
router.put("/admin/update", isLogIn,isAdmin,adminUserController.adminProfileUpdate);








module.exports = router;