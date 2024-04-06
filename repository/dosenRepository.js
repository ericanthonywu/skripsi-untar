const db = require("../config/database/connection")
const {checkExistsTable} = require("../util");

exports.checkNISNDosenExists = async nisn =>
    await checkExistsTable(db('dosen').where({nomor_induk_dosen_nasional: nisn}))

exports.getAllDosen = async () =>
    await db('dosen')
        .select("id", "nama_dosen", "nomor_induk_dosen_nasional")

exports.getDosenById = async (id) =>
    await db('dosen')
        .first("id", "nama_dosen", "nomor_induk_dosen_nasional", 'nomor_induk_pegawai', 'email')
        .where({id})

exports.getDosen = async (search, offset, limit, sort_column, sort_direction) =>
    await db("dosen")
        .select("id", "nama_dosen", "nomor_induk_dosen_nasional", 'nomor_induk_pegawai', 'email')
        .offset(offset)
        .limit(limit)
        .orderBy(sort_column, sort_direction)
        .where(q => q.where('nama_dosen',
            'ILIKE', `${search}%`)
            .orWhere('nomor_induk_dosen_nasional', 'ILIKE',
                `%${search}%`)
        )

exports.getTotalDosen = async () =>
    await db("dosen").count("id as total").first()

exports.addDosen = async data => await db('dosen').insert(data)

exports.updateDosen = async (id, data) =>
    await db('dosen').update(data).where({id})

exports.deleteDosen = async (id) =>
    await db('dosen').where({id}).del()