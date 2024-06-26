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
    const {total: total_data} = await dosenRepository.getTotalDosen(search)

    return {
        data, total_data
    }
}

exports.getPenelitianDatatable = async (search, offset, limit, sort_column, sort_direction, dosen_id = 0) => {
    const data = await penelitianRepository.getPenelitian(search, offset, limit, sort_column, sort_direction, dosen_id)

    const total = await penelitianServices.getTotalPenelitian(dosen_id, search)

    return {
        data, total_data: total
    }
}

exports.getKategoriDatatable = async () =>
    await kategoriPenelitianRepository.getAllKategori()

exports.getSubkategoriDatatable = async (id) =>
    await kategoriPenelitianRepository.getSubKategoriByKategoriId(id)

exports.getAdminDatatable = async () =>
    await adminRepository.getAdminData()