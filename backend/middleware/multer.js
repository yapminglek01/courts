const multer  = require('multer')
const storage = multer.memoryStorage();
const memoryUpload = multer({ storage: storage });


module.exports = {
    memoryUpload
}