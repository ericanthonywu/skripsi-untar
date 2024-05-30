const db = require("../config/database/connection")
const _ = require("lodash");

exports.checkNimMahasiswaExists = async nim =>
    await db('mahasiswa').where({nomor_induk_mahasiswa: nim}).first('nama_mahasiswa')

exports.findMahasiswaByNameAndNIDN = async (search, exclude) => {
    const limit = 5
    return db('mahasiswa')
        .where(q => q.where('nama_mahasiswa', 'ILIKE', `%${search}%`)
            .orWhere('nomor_induk_mahasiswa', 'ILIKE', `%${search}%`))
        .whereNotIn('nomor_induk_mahasiswa', exclude ?? [])
        .select('nama_mahasiswa', 'nomor_induk_mahasiswa')
        .limit(limit)
}

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

exports.addMultipleMahasiswa = async (data) => {
    const trx = await db.transaction()
    try {
        for (const chunk of _.chunk(data, 100)) {
            await trx('mahasiswa').insert(chunk);
        }
        await trx.commit()
    } catch (e) {
        await trx.rollback()
        throw e
    }
}

exports.updateMahasiswa = async (data) =>
    await db('mahasiswa').update(data).where({id: data.id})

exports.deleteMahasiswa = async (id) =>
    await db('mahasiswa').where({id}).del()