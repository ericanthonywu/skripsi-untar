const multer = require("multer");
const path = require("path");
const fs = require("fs");
const uuid = require('uuid');

const filename = (_, file, cb) => {
    cb(null, uuid.v4() + path.extname(file.originalname))
}

/**
 * Handle multiple field file upload using multer
 *
 * @param {array<{name: string, maxCount: number, dest: string}>} options
 */
exports.multerMultipleFieldHandler = options => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            req.fileOptions = options
            for (const {name, dest} of options) {
                if (file.fieldname === name) {
                    try {
                        fs.mkdirSync(path.join(__dirname, `../uploads`), {recursive: true})
                        fs.mkdirSync(path.join(__dirname, `../uploads/${dest}`), {recursive: true})
                    } catch (e) {
                        console.log("error creating directory at file handler", e)
                    }
                    return cb(null, path.join(__dirname, `../uploads/${dest}`))
                }
            }
        },
        filename,
    }),
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
}).fields(options.map(({name, maxCount}) => ({name, maxCount})));