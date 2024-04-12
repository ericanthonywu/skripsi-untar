const authServices = require("../../../services/authServices")
const {ADMIN} = require("../../../constant/role")

exports.loginController = async (req, res, next) => {
    try {
        const {username, password} = req.body;

        const {id, role} = await authServices.login(username, password)

        req.session.user = {id, username, role: ADMIN, admin_role: role}

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

exports.logoutController = async (req, res, next) => {
    try {
        req.session.destroy()

        res.redirect("/admin/login")
    } catch (e) {
        next(e)
    }
}

exports.migrateController = async (req, res, next) => {
    try {
        await authServices.migrate()

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}