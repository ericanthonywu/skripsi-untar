const db = require("../config/database/connection")

exports.getDosen = async (search, offset, limit) =>
    await db("dosen")
        .select("id", "nama_dosen", "nomor_induk_dosen")
        .offset(offset)
        .limit(limit)
        .where(q => q.where('nama_dosen',
            'ILIKE', `${search}%`)
            .orWhere('nomor_induk_dosen', 'ILIKE',
                `%${search}%`)
        )

exports.getTotalDosen = async () =>
    await db("dosen").count("id as total").first()