const dosenRepository = require('../repository/dosenRepository')
const bcrypt = require('bcrypt')
exports.getAllDosen = async () =>
    await dosenRepository.getAllDosen()

exports.getDosenById = async id =>
    await dosenRepository.getDosenById(id)

exports.addDosen = async data => {
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt())
    await dosenRepository.addDosen(data)
}

exports.updateDosen = async data => {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, await bcrypt.genSalt())
    }
    await dosenRepository.updateDosen(data.id, data)
}

exports.deleteDosen = async id => {
    await dosenRepository.deleteDosen(id)
}