const dosenRepository = require('../repository/dosenRepository')

exports.getAllDosen = async () =>
    await dosenRepository.getAllDosen()