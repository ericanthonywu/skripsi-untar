const db = require("../config/database/connection")

exports.getDosen = async () =>
    await db("dosen").select("id", "nama_dosen", "nomor_induk_dosen")
