const db = require("../config/database/connection")
const {checkExistsTable} = require("../util");
const _ = require('lodash')

exports.checkNISNDosenExists = async nisn =>
    await db('dosen').where({nomor_induk_dosen_nasional: nisn}).first('nama_dosen')

exports.checkEmailDosenExists = async email =>
    await checkExistsTable(db('dosen').where({email}))

exports.checkNIPDosenExists = async nip =>
    await checkExistsTable(db('dosen').where({nomor_induk_pegawai: nip}))

exports.getDosenByEmail = async email =>
    await db('dosen').where({email})
        .first('id', 'password')

exports.getAllDosen = async () =>
    await db('dosen')
        .select("id", "nama_dosen", "nomor_induk_dosen_nasional")

exports.getDosenById = async (id) =>
    await db('dosen')
        .first("id", "nama_dosen", "nomor_induk_dosen_nasional", 'nomor_induk_pegawai', 'email')
        .where({id})

exports.getDosen = async (search, offset, limit, sort_column, sort_direction) => {
    const query = db("dosen")
        .select("id", "nama_dosen", "nomor_induk_dosen_nasional", 'nomor_induk_pegawai', 'email')
        .orderBy(sort_column, sort_direction)
        .where(q => q.where('nama_dosen',
            'ILIKE', `%${search}%`)
            .orWhere('nomor_induk_dosen_nasional', 'ILIKE',
                `%${search}%`)
            .orWhere('nomor_induk_pegawai', 'ILIKE',
                `%${search}%`)
            .orWhere('email', 'ILIKE',
                `%${search}%`)
        )
    if (limit != "-1") {
        query.offset(offset)
            .limit(limit)
    }

    return await query
}

exports.getTotalDosen = async (search) =>
    await db("dosen").count("id as total").where(q => q.where('nama_dosen',
        'ILIKE', `%${search}%`)
        .orWhere('nomor_induk_dosen_nasional', 'ILIKE',
            `%${search}%`)
        .orWhere('nomor_induk_pegawai', 'ILIKE',
            `%${search}%`)
        .orWhere('email', 'ILIKE',
            `%${search}%`)
    ).first()

exports.addDosen = async data => await db('dosen').insert(data)

exports.addBulkDosen = async data => {
    const trx = await db.transaction()
    try {
        for (const chunk of _.chunk(data, 100)) {
            await trx('dosen').insert(chunk);
        }
        await trx.commit()
    } catch (e) {
        await trx.rollback()
        throw e
    }
}

exports.updateDosen = async (id, data) =>
    await db('dosen').update(data).where({id})

exports.deleteDosen = async (id) =>
    await db('dosen').where({id}).del()