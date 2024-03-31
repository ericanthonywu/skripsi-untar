const penelitianRepository = require('../repository/penelitianRepository')

exports.addPenelitianServices = async (data, anggota, dokumen) => {
    await penelitianRepository.addPenelitian(data, anggota, dokumen)
}