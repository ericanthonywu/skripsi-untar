const adminRepository = require("../repository/adminRepository")
const bcrypt = require("bcrypt");
const ServiceError = require("../exception/errorException");
const {HTTP_STATUS} = require("../constant/httpStatusConstant");

exports.getAdminById = async id =>
    await adminRepository.getAdminById(id)

exports.addAdmin = async (username, password, role = "viewer") => {
    if (await adminRepository.checkAdminExists(username)) {
        throw new ServiceError('username sudah pernah terdaftar', HTTP_STATUS.BAD_REQUEST)
    }
    await adminRepository.register(username, password, role)
}

exports.updateAdmin = async (id, data) => {
    if (data.username) {
        const {username} = await adminRepository.getAdminById(id)

        if (username !== data.username) {
            if (await adminRepository.checkAdminExists(data.username)) {
                throw new ServiceError('username sudah pernah terdaftar', HTTP_STATUS.BAD_REQUEST)
            }
        }
    }

    if (data.password) {
        data.password = await bcrypt.hash(data.password, await bcrypt.genSalt())
    } else {
        delete data.password
    }
    await adminRepository.updateAdminData(id, data)
}

exports.deleteAdmin = async id => {
    await adminRepository.deleteAdminData(id)
}