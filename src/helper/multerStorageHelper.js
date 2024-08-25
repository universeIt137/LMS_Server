const multer = require("multer");

var multerUploder = multer({
    storage : multer.diskStorage({}),
    limits : { fileSize : 500000000 }
});


module.exports = {multerUploder};