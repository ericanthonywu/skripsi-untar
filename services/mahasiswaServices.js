const mahasiswaRepository = require('../repository/mahasiswaRepository')

exports.getAllMahasiswa = async () =>
    await mahasiswaRepository.getAllMahasiswa()

exports.getMahasiswaById = async (id) =>
    await mahasiswaRepository.getMahasiswaById(id)

exports.addMahasiswa = async data =>
    await mahasiswaRepository.addMahasiswa(data)

exports.updateMahasiswa = async data =>
    await mahasiswaRepository.updateMahasiswa(data)

exports.deleteMahasiswa = async id =>
    await mahasiswaRepository.deleteMahasiswa(id)