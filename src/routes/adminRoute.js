const express = require("express");

const router = new express.Router();
const {isLogIn} = require("../middlewares/authMiddleware")

//adminUser controller
const adminUserController = require("../controllers/admin/adminController");

router.get("/all-user",  )






module.exports = router;