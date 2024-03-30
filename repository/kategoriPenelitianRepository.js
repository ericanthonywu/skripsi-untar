const db = require("../config/database/connection")

exports.getAllKategori = async () => await db('master_kategori_penelitian')

exports.getKategoriById = async id => await db('master_kategori_penelitian').where({id}).first('nama')

exports.updateKategoriById = async (id, nama) => await db('master_kategori_penelitian').where({id}).update({nama})

exports.deleteKategoriById = async id => await db('master_kategori_penelitian').where({id}).del()

exports.getSubKategoriByKategoriId = async idKategori => await db('master_subkategori_penelitian').where({id_master_kategori_penelitian: idKategori}).select('id', 'nama')