const dosenRepository = require('../../repository/dosenRepository')
const mahasiswaRepository = require('../../repository/mahasiswaRepository')

exports.getMahasiswaDatatable = async (offset, limit) => {
    const data = await mahasiswaRepository.getMahasiswa(offset, limit)
    const {total: total_data} = await mahasiswaRepository.getTotalMahasiswa()

    return {
        data, total_data
    }
}