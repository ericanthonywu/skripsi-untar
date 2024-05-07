const adminRepository = require("../repository/adminRepository")
const dosenServices = require("../services/dosenServices")
const bcrypt = require("bcrypt")
const ServiceError = require("../exception/errorException");
const {HTTP_STATUS} = require("../constant/httpStatusConstant");

exports.migrate = async () => {
    const password = await bcrypt.hash("password", await bcrypt.genSalt())
    await adminRepository.register("admin", password)
}

exports.login = async (username, password) => {
    if (!await adminRepository.checkAdminExists(username)) {
        throw new ServiceError("username tidak tersedia", HTTP_STATUS.FORBIDDEN)
    }

    const {id, password: dbPassword, role} = await adminRepository.findAdminByUsername(username)

    if (!await bcrypt.compare(password, dbPassword)) {
        throw new ServiceError("password salah", HTTP_STATUS.FORBIDDEN)
    }

    return {
        id, role
    }
}

exports.loginDosen = async (email, password) => {
    if (!await dosenServices.checkEmailDosenExists(email)) {
        throw new ServiceError('email tidak tersedia', HTTP_STATUS.FORBIDDEN)
    }

    const {id, password: dbPassword} = await dosenServices.getDosenByEmail(email)

    if (!await bcrypt.compare(password, dbPassword)) {
        throw new ServiceError("password salah", HTTP_STATUS.FORBIDDEN)
    }

    return {
        id
    }
}

exports.changeAdminPassword = async (id, password) => {
    await adminRepository.updateAdminData(id, {password: await bcrypt.hash(password, await bcrypt.genSalt())})
}

exports.changeDosenPassword = async (id, password) => {
    await dosenServices.updateDosen({
        id,
        password: await bcrypt.hash(password, await bcrypt.genSalt())
    })
}