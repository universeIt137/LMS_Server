const express = require("express");

const router = new express.Router();
const {isLogIn,isAdmin} = require("../middlewares/authMiddleware")

//adminUser controller
const adminUserController = require("../controllers/admin/adminController");

router.get("/all-user", isLogIn, isAdmin, adminUserController.allUser);








module.exports = router;