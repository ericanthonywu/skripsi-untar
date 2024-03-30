const mahasiswaRepository = require('../repository/mahasiswaRepository')

exports.getAllMahasiswa = async () =>
    await mahasiswaRepository.getAllMahasiswa()