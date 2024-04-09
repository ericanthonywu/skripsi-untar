const adminRepository = require("../repository/adminRepository")
const bcrypt = require("bcrypt");

exports.getAdminById = async id =>
    await adminRepository.getAdminById(id)

exports.addAdmin = async (username, password) => {
    await adminRepository.register(username, password, "viewer")
}

exports.updateAdmin = async (id, data) => {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, await bcrypt.genSalt())
    } else {
        delete data.password
    }
    await adminRepository.updateAdminData(id, data.username, data.password)
}

exports.deleteAdmin = async id => {
    await adminRepository.deleteAdminData(id)
}