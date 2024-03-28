const dosenRepository = require('../../repository/dosenRepository')
const mahasiswaRepository = require('../../repository/mahasiswaRepository')
const penelitianRepository = require('../../repository/penelitianRepository')

exports.getMahasiswaDatatable = async (search, offset, limit,sort_column, sort_direction) => {
    const data = await mahasiswaRepository.getMahasiswa(search, offset, limit,sort_column, sort_direction)
    const {total: total_data} = await mahasiswaRepository.getTotalMahasiswa()

    return {
        data, total_data
    }
}

exports.getDosenDatatable = async (search, offset, limit,sort_column, sort_direction) => {
    const data = await dosenRepository.getDosen(search, offset, limit,sort_column, sort_direction)
    const {total: total_data} = await dosenRepository.getTotalDosen()

    return {
        data, total_data
    }
}

exports.getPenelitianDatatable = async (search, offset, limit,sort_column, sort_direction) => {
    const data = await penelitianRepository.getPenelitian(search, offset, limit,sort_column, sort_direction)
    const {total: total_data} = await penelitianRepository.getTotalPenelitian()

    return {
        data, total_data
    }
}