const multer = require('multer');

var storage = multer.diskStorage({})
var upload = multer({ storage: storage });

exports.upload = upload;