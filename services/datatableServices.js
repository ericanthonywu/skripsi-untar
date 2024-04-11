const dosenRepository = require('../repository/dosenRepository')
const mahasiswaRepository = require('../repository/mahasiswaRepository')
const penelitianRepository = require('../repository/penelitianRepository')
const kategoriPenelitianRepository = require("../repository/kategoriPenelitianRepository");
const adminRepository = require("../repository/adminRepository");
const penelitianServices = require("../services/penelitianServices");

exports.getMahasiswaDatatable = async (search, offset, limit, sort_column, sort_direction) => {
    const data = await mahasiswaRepository.getMahasiswa(search, offset, limit, sort_column, sort_direction)
    const {total: total_data} = await mahasiswaRepository.getTotalMahasiswa()

    return {
        data, total_data
    }
}

exports.getDosenDatatable = async (search, offset, limit, sort_column, sort_direction) => {
    const data = await dosenRepository.getDosen(search, offset, limit, sort_column, sort_direction)
    const {total: total_data} = await dosenRepository.getTotalDosen()

    return {
        data, total_data
    }
}

exports.getPenelitianDatatable = async (search, offset, limit, sort_column, sort_direction) => {
    const data = await penelitianRepository.getPenelitian(search, offset, limit, sort_column, sort_direction)

    const {total: total_data} = await penelitianServices.getTotalPenelitian(0, search)

    return {
        data, total_data
    }
}

exports.getKategoriDatatable = async () =>
    await kategoriPenelitianRepository.getAllKategori()

exports.getSubkategoriDatatable = async (id) =>
    await kategoriPenelitianRepository.getSubKategoriByKategoriId(id)

exports.getAdminDatatable = async () =>
    await adminRepository.getAdminData()