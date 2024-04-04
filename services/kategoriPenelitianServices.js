const kategoriPenelitianRepository = require('../repository/kategoriPenelitianRepository')

exports.getAllKategoriData = () => kategoriPenelitianRepository.getAllKategori()
exports.getKategoriById = (id) => kategoriPenelitianRepository.getKategoriById(id)

exports.getSubKategoriByKategoriId = kategoriId => kategoriPenelitianRepository.getSubKategoriByKategoriId(kategoriId)

exports.addKategori = async nama => await kategoriPenelitianRepository.addKategori(nama)
exports.deleteKategori = async id => await kategoriPenelitianRepository.deleteKategoriById(id)

exports.addSubkategori = async (nama, id_master_kategori_penelitian) => await kategoriPenelitianRepository.addSubkategori(nama, id_master_kategori_penelitian)
exports.deleteSubkategori = async id => await kategoriPenelitianRepository.deleteSubkategoriById(id)