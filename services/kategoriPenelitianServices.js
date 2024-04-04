const kategoriPenelitianRepository = require('../repository/kategoriPenelitianRepository')

exports.getAllKategoriData = () => kategoriPenelitianRepository.getAllKategori()

exports.getSubKategoriByKategoriId = kategoriId => kategoriPenelitianRepository.getSubKategoriByKategoriId(kategoriId)

exports.addKategori = async nama => await kategoriPenelitianRepository.addKategori(nama)
exports.deleteKategori = async id => await kategoriPenelitianRepository.deleteKategoriById(id)