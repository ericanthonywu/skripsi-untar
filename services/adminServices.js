const adminRepository = require("../repository/adminRepository")
const bcrypt = require("bcrypt");

exports.getAdminById = async id =>
    await adminRepository.getAdminById(id)

exports.addAdmin = async (username, password, role = "viewer") => {
    await adminRepository.register(username, password, role)
}

exports.updateAdmin = async (id, data) => {
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