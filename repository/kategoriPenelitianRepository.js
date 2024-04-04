const db = require("../config/database/connection")

exports.getAllKategori = async () => await db('master_kategori_penelitian')

exports.getKategoriById = async id => await db('master_kategori_penelitian').where({id}).first('nama')

exports.addKategori = async nama => await db('master_kategori_penelitian').insert({nama})

exports.updateKategoriById = async (id, nama) => await db('master_kategori_penelitian').where({id}).update({nama})

exports.deleteKategoriById = async id => await db('master_kategori_penelitian').where({id}).del()

exports.getSubKategoriByKategoriId = async idKategori => await db('master_subkategori_penelitian').where({id_master_kategori_penelitian: idKategori}).select('id', 'nama')

exports.addSubkategori = async (nama, id_master_kategori_penelitian) => await db('master_subkategori_penelitian').insert({nama, id_master_kategori_penelitian})

exports.deleteSubkategoriById = async id => await db('master_subkategori_penelitian').where({id}).del()