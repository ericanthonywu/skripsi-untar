const db = require("../config/database/connection")

exports.getMahasiswa = async (search, offset, limit,sort_column, sort_direction) =>
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