const multer = require("multer");



const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            //Push image on the basis type inside different folder
            if (file.fieldname == "reviewimg") {
                cb(null, 'images/review');
            }
            if (file.fieldname == "serviceimg") {
                cb(null, 'images/service');
            }
            if (file.fieldname == "userimg") {
                cb(null, 'images/user');
            }          
            if (file.fieldname == "galleryimg") {
                cb(null, 'images/gallery');
            }          
        },
        filename(req, file, cb) {
            cb(null, `${new Date().getTime()}_${file.originalname}`);
        }
    }),
    limits: {
        fileSize: 1000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
        // if (!file.originalname.match(/\.(jpeg|jpg|pdf|doc|docx|xlsx|xls)$/)) {
            return cb(
                new Error(
                    'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
                )
            );
        }
        cb(undefined, true); // continue with upload
    }
});


module.exports = upload;