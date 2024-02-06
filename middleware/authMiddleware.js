const {HTTP_STATUS} = require("../constant/httpStatusConstant");
exports.authMiddleware = (req,res,next) => {
    if (!req.session.user) {
        return res.redirect("/admin/login?err=session_expired")
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

    return res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        data: null,
        error: {message: error.message, details: error.stack}
    })
}