const db = require("../config/database/connection")

exports.getAllKategori = async () => await db('master_kategori_penelitian')

exports.getKategoriById = async id => await db('master_kategori_penelitian').where({id}).first('nama','id')

exports.addKategori = async nama => await db('master_kategori_penelitian').insert({nama})
exports.updateKategori = async (id, nama) => await db('master_kategori_penelitian').update({nama}).where({id})

exports.updateKategoriById = async (id, nama) => await db('master_kategori_penelitian').where({id}).update({nama})

exports.deleteKategoriById = async id => await db('master_kategori_penelitian').where({id}).del()

exports.getSubKategoriByKategoriId = async idKategori => await db('master_subkategori_penelitian').where({id_master_kategori_penelitian: idKategori}).select('id', 'nama')
exports.getSubKategoriById = async id => await db('master_subkategori_penelitian').where({id}).first('id', 'nama')

exports.addSubkategori = async (nama, id_master_kategori_penelitian) => await db('master_subkategori_penelitian').insert({nama, id_master_kategori_penelitian})
exports.updateSubkategori = async (nama, id) => await db('master_subkategori_penelitian').update({nama}).where({id})

exports.deleteSubkategoriById = async id => await db('master_subkategori_penelitian').where({id}).del()