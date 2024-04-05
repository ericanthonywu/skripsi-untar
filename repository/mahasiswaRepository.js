const db = require("../config/database/connection")

exports.getAllMahasiswa = async () =>
    await db('mahasiswa').select("id", "nama_mahasiswa", "nomor_induk_mahasiswa")

exports.getMahasiswaById = async (id) =>
    await db('mahasiswa')
        .first('id', "nama_mahasiswa", "nomor_induk_mahasiswa")
        .where({id})

exports.getMahasiswa = async (search, offset, limit, sort_column, sort_direction) =>
    await db("mahasiswa")
        .select("id", "nama_mahasiswa", "nomor_induk_mahasiswa")
        .offset(offset)
        .limit(limit)
        .orderBy(sort_column, sort_direction)
        .where(q => q.where('nama_mahasiswa',
            'ILIKE', `${search}%`)
            .orWhere('nomor_induk_mahasiswa', 'ILIKE',
                `%${search}%`)
        )

exports.getTotalMahasiswa = async () =>
    await db("mahasiswa").count("id as total").first()

exports.addMahasiswa = async (data) =>
    await db("mahasiswa").insert(data)

exports.updateMahasiswa = async (data) =>
    await db('mahasiswa').update(data).where({id: data.id})

exports.deleteMahasiswa = async (id) =>
    await db('mahasiswa').where({id}).del()