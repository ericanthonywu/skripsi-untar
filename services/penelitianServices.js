const penelitianRepository = require('../repository/penelitianRepository')

exports.addPenelitianServices = async (data, anggota, file) => {
    await penelitianRepository.addPenelitian(data, anggota, file)
}

exports.deletePenelitianServices = async id => {
    await penelitianRepository.deletePenelitian(id)
}