const {HTTP_STATUS} = require("../constant/httpStatusConstant");
const fs = require("fs");

exports.authMiddleware = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/admin/login")
    }

    next()
}

exports.adminRoleMiddleware = (req, res, next) => {
    if (req.session.user.admin_role === "admin") {
        next()
        return
    }

    return res.redirect("/admin/login")
}

/**
 * global default error handler
 *
 * @param error {ServiceError}
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
        try {
            for (const {path} of req.files || req.files.file) {
                fs.unlinkSync(path)
            }
        } catch (e) {

        }
    }

    return res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        data: null,
        error: {message: error.message, details: error.stack}
    })
}