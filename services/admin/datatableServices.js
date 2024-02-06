const dosenRepository = require('../../repository/dosenRepository')
const mahasiswaRepository = require('../../repository/mahasiswaRepository')

exports.getMahasiswaDatatable = async (search, offset, limit) => {
    const data = await mahasiswaRepository.getMahasiswa(search, offset, limit)
    const {total: total_data} = await mahasiswaRepository.getTotalMahasiswa()

    return {
        data, total_data
    }
}

exports.getDosenDatatable = async (search, offset, limit) => {
    const data = await dosenRepository.getDosen(search, offset, limit)
    const {total: total_data} = await dosenRepository.getTotalDosen()

    return {
        data, total_data
    }
}