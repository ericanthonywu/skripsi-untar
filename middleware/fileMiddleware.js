const multer = require("multer");
const path = require("path");
const fs = require("fs");
const randomstring = require('uuidv4');

const filename = (_, file, cb) => {
    cb(null, randomstring.uuid() + path.extname(file.originalname))
}


/**
 * Handle single field file upload using multer
 *
 * @param {string} dest
 * @param field
 */
exports.multerSingleFieldFileHandler = (dest, field = "image") =>
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                req.dest = dest;
                req.field = field;
                try {
                    fs.mkdirSync(path.join(__dirname, `../uploads`), {recursive: true})
                    fs.mkdirSync(path.join(__dirname, `../uploads/${req.dest}`), {recursive: true})
                    cb(null, path.join(__dirname, `../uploads/${req.dest}`))
                } catch (e) {
                    console.error("error creating directory at file handler", e)
                    cb(e, null)
                }
            },
            filename,
        }),
        limits: {
            fileSize: 1024 * 1024 * 5,
        },
    }).fields([{name: field, maxCount: 1}])

/**
 * Handle multiple field file upload using multer
 *
 * @param {array<{name: string, maxCount: number, dest: string}>} options
 */
exports.multerMultipleFieldHandler = options => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            req.dest = options
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