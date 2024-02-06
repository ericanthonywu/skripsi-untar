const db = require("../config/database/connection")

exports.getMahasiswa = async (search, offset, limit) =>
    await db("mahasiswa")
        .select("id", "nama_mahasiswa", "nomor_induk_mahasiswa")
        .offset(offset)
        .limit(limit)

exports.getTotalMahasiswa = async () =>
    await db("mahasiswa").count("id as total").first()