const mahasiswaRepository = require('../repository/mahasiswaRepository')

exports.checkNIMMahasiswaExists = async nim =>
    await mahasiswaRepository.checkNimMahasiswaExists(nim)

exports.getAllMahasiswa = async () =>
    await mahasiswaRepository.getAllMahasiswa()

exports.getMahasiswaById = async (id) =>
    await mahasiswaRepository.getMahasiswaById(id)

exports.addMahasiswa = async data =>
    await mahasiswaRepository.addMahasiswa(data)

exports.addMultipleMahasiswa = async data =>
    await mahasiswaRepository.addMultipleMahasiswa(data)

exports.updateMahasiswa = async data =>
    await mahasiswaRepository.updateMahasiswa(data)

exports.deleteMahasiswa = async id =>
    await mahasiswaRepository.deleteMahasiswa(id)