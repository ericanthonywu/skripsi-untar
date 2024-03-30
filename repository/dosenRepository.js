const db = require("../config/database/connection")

exports.getAllDosen = async () =>
await db('dosen')
    .select("id", "nama_dosen", "nomor_induk_dosen")

exports.getDosen = async (search, offset, limit, sort_column, sort_direction) =>
    await db("dosen")
        .select("id", "nama_dosen", "nomor_induk_dosen")
        .offset(offset)
        .limit(limit)
        .orderBy(sort_column, sort_direction)
        .where(q => q.where('nama_dosen',
            'ILIKE', `${search}%`)
            .orWhere('nomor_induk_dosen', 'ILIKE',
                `%${search}%`)
        )

exports.getTotalDosen = async () =>
    await db("dosen").count("id as total").first()