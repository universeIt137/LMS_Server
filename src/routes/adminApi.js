const express = require('express');
const multer = require('multer');
const { userImageUpload } = require('../controllers/admin/adminController');

const router = express.Router();

const uploderHelper = require("../helper/uploderHelper")

router.post('/upload', uploderHelper.uploadFile );

module.exports = router;
