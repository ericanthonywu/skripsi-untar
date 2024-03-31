const {HTTP_STATUS} = require("../constant/httpStatusConstant");
const fs = require("fs");
const moment = require("moment");
exports.authMiddleware = (req, res, next) => {
    if (!req.session) {
        return res.redirect("/admin/login")
    }

    next()
}

/**
 * global default error handler
 *
 * @param error
 * @param {e.Request} req
 * @param {e.Response} res
 */
exports.defaultApiErrorhandler = (error, req, res) => {
    if (typeof error == "undefined") {
        return res.status(HTTP_STATUS.NOT_FOUND).render("page/notFound")
    }

    if (error.status === HTTP_STATUS.INTERNAL_SERVER_ERROR || error.status === undefined) {
        console.log("error occurred: ", error)
    }

    // delete file if error
    if (req.files) {
        for (const {path} of req.files) {
            fs.unlinkSync(path)
        }
    }

    return res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        data: null,
        error: {message: error.message, details: error.stack}
    })
}