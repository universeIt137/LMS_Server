const express = require("express");

const router = new express.Router();
const {isLogIn,isAdmin} = require("../middlewares/authMiddleware")

//adminUser controller
const adminUserController = require("../controllers/admin/adminAuthController");
// course controller
const courseController = require("../controllers/admin/courseController");



router.delete
("/user/delete/:id", isLogIn, isAdmin,adminUserController.deleteUser);
router.get("/all-user/", isLogIn, isAdmin, adminUserController.allUser);
router.put
("/admin/update", isLogIn,isAdmin,adminUserController.adminProfileUpdate);


// course related api

router.post
("/course/create", isLogIn, isAdmin , courseController.courseCreate);

router.put
("/course/update/:id",isLogIn,isAdmin, courseController.courseUpdate);


module.exports = router;