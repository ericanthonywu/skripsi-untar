const authServices = require("../../../services/admin/authServices")
const {ADMIN} = require("../../../constant/role")

exports.login = async (req, res, next) => {
    try {
        const {username, password} = req.body;

        const {id} = await authServices.login(username, password)

        req.session.user = {id, username, role: ADMIN}

        res.sendResponse()
    } catch (e) {
        next(e)
    }
}

exports.logout = async (req, res, next) => {
    try {
        req.session.destroy()

        res.redirect("/admin/login")
    } catch (e) {
        next(e)
    }
}

exports.migrate = async (req, res, next) => {
    try {
        await authServices.migrate()

        res.sendResponse()
    } catch (e) {
        next(e)
    }
}