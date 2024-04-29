const mahasiswaRepository = require('../repository/mahasiswaRepository')
const ServiceError = require("../exception/errorException");
const {HTTP_STATUS} = require("../constant/httpStatusConstant");

exports.checkNIMMahasiswaExists = async nim =>
    await mahasiswaRepository.checkNimMahasiswaExists(nim)

exports.getAllMahasiswa = async () =>
    await mahasiswaRepository.getAllMahasiswa()

exports.getMahasiswaById = async (id) =>
    await mahasiswaRepository.getMahasiswaById(id)

exports.addMahasiswa = async data =>
    await mahasiswaRepository.addMahasiswa(data)

exports.addMultipleMahasiswa = async data => {
    let i = 1
    for (const {nama_mahasiswa, nomor_induk_mahasiswa} of data) {
        if (!nama_mahasiswa) {
            throw new ServiceError(`nama_mahasiswa tidak terisi pada row ${i}`, HTTP_STATUS.BAD_REQUEST)
        }

        if (!nomor_induk_mahasiswa) {
            throw new ServiceError(`nomor_induk_mahasiswa tidak terisi pada row ${i}`, HTTP_STATUS.BAD_REQUEST)
        }
        i++
    }
    await mahasiswaRepository.addMultipleMahasiswa(data)
}

exports.updateMahasiswa = async data =>
    await mahasiswaRepository.updateMahasiswa(data)

exports.deleteMahasiswa = async id =>
    await mahasiswaRepository.deleteMahasiswa(id)