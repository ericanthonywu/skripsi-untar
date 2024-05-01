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
    const errorList = []

    const nomorIndukMahasiswaSet = new Set();

    for (const {nama_mahasiswa, nomor_induk_mahasiswa} of data) {
        if (!nama_mahasiswa) {
            errorList.push(`nama_mahasiswa tidak terisi pada row ${i}`)
        }

        if (!nomor_induk_mahasiswa) {
            errorList.push(`nomor_induk_mahasiswa tidak terisi pada row ${i}`)
        } else if (nomorIndukMahasiswaSet.has(nomor_induk_mahasiswa)) {
            errorList.push(`Duplicate nomor_induk_mahasiswa pada row ${i}`)
        } else if (await mahasiswaRepository.checkNimMahasiswaExists(nomor_induk_mahasiswa)) {
            errorList.push(`Duplicate nomor_induk_mahasiswa pada row ${i}`)
        } else {
            nomorIndukMahasiswaSet.add(nomor_induk_mahasiswa)
        }

        i++
    }

    if (errorList.length > 0) {
        throw new ServiceError(errorList.join("\n"), HTTP_STATUS.BAD_REQUEST)
    }

    await mahasiswaRepository.addMultipleMahasiswa(data)
}

exports.updateMahasiswa = async data =>
    await mahasiswaRepository.updateMahasiswa(data)

exports.deleteMahasiswa = async id =>
    await mahasiswaRepository.deleteMahasiswa(id)