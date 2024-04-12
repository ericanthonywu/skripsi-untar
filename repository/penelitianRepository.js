const db = require("../config/database/connection")

exports.getPenelitian = (search, offset, limit, sort_column, sort_direction) =>
    db("penelitian")
        .select("penelitian.id", "nama_proposal", "biaya", 'periode_awal', 'periode_akhir', 'master_kategori_penelitian.nama as kategori_penelitian', 'master_subkategori_penelitian.nama as subkategori_penelitian', 'status', 'status_updated_at')
        .join('master_subkategori_penelitian', 'master_subkategori_penelitian.id', 'penelitian.id_subkategori_penelitian')
        .join('master_kategori_penelitian', 'master_kategori_penelitian.id', 'master_subkategori_penelitian.id_master_kategori_penelitian')
        .offset(offset)
        .limit(limit)
        .orderBy(sort_column, sort_direction)
        .where('nama_proposal', 'ILIKE', `${search}%`)

exports.getTotalPenelitian = async (dosen_id, search) => {
    const query = db("penelitian")

    if (dosen_id) {
        query.join('anggota_penelitian', 'anggota_penelitian.id_penelitian', 'penelitian.id')
            .whereIn('id_dosen', dosen_id)
    }

    if (search) {
        query.where('nama_proposal', 'ILIKE', `${search}%`)
    }

    const data = await query
        .count('penelitian.id as total')
        .first()

    return data || 0
}

exports.getAnalyticPenelitian = async year =>
    await db("penelitian")
        .whereRaw('EXTRACT(year FROM status_updated_at) = ?', [year])
        .select(
            'status',
            db.raw('EXTRACT(MONTH FROM status_updated_at) AS month'),
            db.raw('EXTRACT(year FROM status_updated_at) AS year'),
            db.raw('count(id) as total'),
        )
        .groupBy('status')
        .groupBy('month')
        .groupBy('year')
        .orderBy('month')
        .orderBy('year')

exports.getBiayaPenelitian = async year =>
    await db("penelitian")
        .whereRaw('EXTRACT(year FROM status_updated_at) = ?', [year])
        .select(
            'status',
            db.raw('EXTRACT(MONTH FROM status_updated_at) AS month'),
            db.raw('EXTRACT(year FROM status_updated_at) AS year'),
            db.raw('sum(biaya) as total')
        )
        .groupBy('status')
        .groupBy('month')
        .groupBy('year')
        .orderBy('month')
        .orderBy('year')

exports.getTotalPenelitianSelesai = async () =>
    await db('penelitian')
        .count('penelitian.id as total')
        .first()
        .where({status: "Selesai"})

exports.getTotalPenelitianBatal = async () =>
    await db('penelitian')
        .count('penelitian.id as total')
        .first()
        .where({status: "Batal"})

exports.getTotalPenelitianSedangBerlanjut = async () =>
    await db('penelitian')
        .count('penelitian.id as total')
        .first()
        .where({status: "Sedang Berlanjut"})

exports.addPenelitian = async (data, anggota, dokumen) => {
    const trx = await db.transaction()
    try {
        if (dokumen.length === 4) {
            data.status = 'Selesai'
            data.status_updated_at = trx.raw('CURRENT_TIMESTAMP')
        }
        const [{id}] = await trx('penelitian').insert(data, 'id')

        let i = 0
        for (const nisn_dosen of anggota.list_dosen) {
            await trx('anggota_penelitian').insert({
                id_penelitian: id,
                id_dosen: trx('dosen').where({nomor_induk_dosen_nasional: nisn_dosen}).first('id'),
                status_ketua_dosen: i === 0
            })
            i++
        }

        for (const nim_mahasiswa of anggota.list_mahasiswa) {
            await trx('anggota_penelitian').insert({
                id_penelitian: id,
                id_mahasiswa: trx('mahasiswa').where({nomor_induk_mahasiswa: nim_mahasiswa}).first('id'),
            })
        }

        for (const {fieldname, filename, originalname} of dokumen) {
            await trx('dokumen_penelitian').insert({
                id_penelitian: id,
                tipe_dokumen: db('master_tipe_penelitian_dokumen').where({nama: fieldname}).first('id'),
                file: `/uploads/${fieldname}/${filename}`,
                original_filename: originalname
            })
        }

        await trx.commit()
    } catch (e) {
        trx.rollback()
        throw e
    }
}

exports.getPenelitianById = async id =>
    await db('penelitian')
        .first(
            'penelitian.id as id',
            'nama_proposal',
            'biaya',
            'periode_awal',
            'created_at',
            'periode_akhir',
            'master_subkategori_penelitian.id as subkategori',
            'master_kategori_penelitian.id as kategori',
            'status'
        )
        .where('penelitian.id', id)
        .join('master_subkategori_penelitian', 'master_subkategori_penelitian.id', 'penelitian.id_subkategori_penelitian')
        .join('master_kategori_penelitian', 'master_kategori_penelitian.id', 'master_subkategori_penelitian.id_master_kategori_penelitian')

exports.getAnggotaDosenByPenelitianId = async id_penelitian =>
    await db('anggota_penelitian')
        .leftJoin('dosen', 'dosen.id', 'anggota_penelitian.id_dosen')
        .pluck('dosen.nomor_induk_dosen_nasional')
        .orderByRaw('status_ketua_dosen = true')
        .where({id_penelitian})
        .whereNotNull('dosen.nomor_induk_dosen_nasional')

exports.getAnggotaMahasiswaByPenelitianId = async id_penelitian =>
    await db('anggota_penelitian')
        .leftJoin('mahasiswa', 'mahasiswa.id', 'anggota_penelitian.id_mahasiswa')
        .pluck('mahasiswa.nomor_induk_mahasiswa')
        .where({id_penelitian})
        .whereNotNull('mahasiswa.nomor_induk_mahasiswa')

exports.getDokumenPenelitianByPenelitianId = async id_penelitian =>
    await db('dokumen_penelitian')
        .where({id_penelitian})
        .join('master_tipe_penelitian_dokumen', 'master_tipe_penelitian_dokumen.id', 'dokumen_penelitian.tipe_dokumen')
        .select('master_tipe_penelitian_dokumen.nama', 'file', 'original_filename')


exports.ubahPenelitian = async (id, data, anggota, dokumen) => {
    const trx = await db.transaction()
    try {
        await trx('penelitian').update(data).where({id})
        await trx('anggota_penelitian')
            .where({id_penelitian: id})
            .del()

        for (const nim_mahasiswa of anggota.list_mahasiswa) {
            await trx('anggota_penelitian').insert({
                id_penelitian: id,
                id_mahasiswa: trx('mahasiswa').where({nomor_induk_mahasiswa: nim_mahasiswa}).first('id'),
            })
        }

        let i = 0
        for (const nisn_dosen of anggota.list_dosen) {
            await trx('anggota_penelitian').insert({
                id_penelitian: id,
                id_dosen: trx('dosen').where({nomor_induk_dosen_nasional: nisn_dosen}).first('id'),
                status_ketua_dosen: i === 0
            })
            i++
        }

        for (const {fieldname, filename, originalname} of dokumen) {
            if (await trx('dokumen_penelitian').update({
                file: `/uploads/${fieldname}/${filename}`,
                original_filename: originalname
            }).where({
                id_penelitian: id,
                tipe_dokumen: db('master_tipe_penelitian_dokumen').where({nama: fieldname}).first('id'),
            }) === 0) {
                await trx('dokumen_penelitian').insert({
                    file: `/uploads/${fieldname}/${filename}`,
                    original_filename: originalname,
                    id_penelitian: id,
                    tipe_dokumen: db('master_tipe_penelitian_dokumen').where({nama: fieldname}).first('id'),
                });
            }
        }

        const {total} = await trx('dokumen_penelitian').where({id_penelitian: id}).count('id as total').first()

        if (total === "4") {
            await trx('penelitian').update({status: 'Selesai', status_updated_at: trx.raw('CURRENT_TIMESTAMP')}).where({id})
        }

        await trx.commit()
    } catch (e) {
        await trx.rollback()
        throw e
    }
}

exports.cancelPenelitian = async id =>
    await db('penelitian').where({id}).update({status: "Batal"})

exports.getProposalPenelitian = async id =>
    await db('dokumen_penelitian')
        .where({id_penelitian: id})
        .pluck('file')

exports.deletePenelitian = async id => {
    await db('penelitian').where({id}).del()
}