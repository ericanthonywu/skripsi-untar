const authServices = require("../../services/authServices")
const {ADMIN, DOSEN} = require("../../constant/role")
const {HTTP_STATUS} = require("../../constant/httpStatusConstant");

exports.loginController = async (req, res, next) => {
    try {
        const {username, password} = req.body;

        const {id, role} = await authServices.login(username, password)

        req.session.user = {id, username, role: ADMIN, admin_role: role}

        res.sendStatus(HTTP_STATUS.OK)
    } catch (e) {
        next(e)
    }
}

exports.loginDosenController = async (req, res, next) => {
    try {
        const {username, password} = req.body;

        const {id} = await authServices.loginDosen(username, password)

        req.session.user = {id, username, role: DOSEN}

        res.sendStatus(HTTP_STATUS.OK)
    } catch (e) {
        next(e)
    }
}

exports.logoutController = async (req, res, next) => {
    try {
        const {role} = req.session.user
        req.session.destroy()

        res.redirect(`/${role.toLowerCase()}/login`)
    } catch (e) {
        next(e)
    }
}

exports.migrateController = async (req, res, next) => {
    try {
        await authServices.migrate()

        res.sendStatus(HTTP_STATUS.OK)
    } catch (e) {
        next(e)
    }
}

exports.changeAdminPassword = async (req, res, next) => {
    try {
        const {id} = req.session.user
        if (!req.body.password) {
            res.sendResponse(null, HTTP_STATUS.BAD_REQUEST, "mohon isi field password")
        }
        await authServices.changeAdminPassword(id, req.body.password)

        res.sendStatus(HTTP_STATUS.OK)
    } catch (e) {
        next(e)
    }
}

exports.changeDosenPassword = async (req, res, next) => {
    try {
        const {id} = req.session.user
        if (!req.body.password) {
            res.sendResponse(null, HTTP_STATUS.BAD_REQUEST, "mohon isi field password")
        }
        await authServices.changeDosenPassword(id, req.body.password)

        res.sendStatus(HTTP_STATUS.OK)
    } catch (e) {
        next(e)
    }
}