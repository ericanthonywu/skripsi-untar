const adminRepository = require("../repository/adminRepository")
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

    const {id, password: dbPassword} = await adminRepository.findAdminByUsername(username)

    if (!await bcrypt.compare(password, dbPassword)) {
        throw new ServiceError("password salah", HTTP_STATUS.FORBIDDEN)
    }

    return {
        id
    }
}