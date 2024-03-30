const kategoriPenelitianRepository = require('../repository/kategoriPenelitianRepository')

exports.getAllKategoriData = () => kategoriPenelitianRepository.getAllKategori()

exports.getSubKategoriByKategoriId = kategoriId => kategoriPenelitianRepository.getSubKategoriByKategoriId(kategoriId)