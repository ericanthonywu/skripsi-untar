const db = require("../config/database/connection")
const {checkExistsTable} = require("../util");
const ServiceError = require("../exception/errorException");
const {HTTP_STATUS} = require("../constant/httpStatusConstant");
const fs = require("fs");
const path = require("node:path");

exports.checkJudulPenelitian = async judul =>
    await checkExistsTable(db("penelitian").where({nama_proposal: judul}))

exports.getPenelitian = (search, offset, limit, sort_column = 'created_at', sort_direction = 'asc', dosen_id = 0) => {
    const query = db("penelitian")
        .select("penelitian.id",
            "nama_proposal",
            "biaya_yang_disetujui",
            "biaya_yang_diajukan",
            'periode_awal',
            'periode_akhir',
            'master_kategori_penelitian.nama as kategori_penelitian',
            'master_subkategori_penelitian.nama as subkategori_penelitian',
            'status',
            'dosen.nama_dosen as ketua_penelitian')
        .join('master_subkategori_penelitian', 'master_subkategori_penelitian.id', 'penelitian.id_subkategori_penelitian')
        .join('master_kategori_penelitian', 'master_kategori_penelitian.id', 'master_subkategori_penelitian.id_master_kategori_penelitian')
        .join('dosen', 'dosen.id', 'penelitian.ketua_dosen_penelitian')
        .orderBy(sort_column, sort_direction)

    if (search) {
        query.where(q =>
            q.where('nama_proposal', 'ILIKE', `%${search}%`)
                .orWhere('status', 'ILIKE', `%${search}%`)
        )
    }

    if (dosen_id) {
        query
            .leftJoin('anggota_penelitian', 'anggota_penelitian.id_penelitian', 'penelitian.id')
            .where(q =>
                q.where('ketua_dosen_penelitian', dosen_id)
                    .orWhere('anggota_penelitian.id_dosen', dosen_id)
            )
    }

    if (limit != "-1") {
        query.offset(offset)
            .limit(limit)
    }

    return query
}

exports.getJudulPenelitianById = async id =>
    await db('penelitian').where({id}).first('nama_proposal')

exports.getTotalPenelitian = async (dosen_id, search) => {
    const query = db("penelitian")

    if (dosen_id) {
        query
            .leftJoin('anggota_penelitian', 'anggota_penelitian.id_penelitian', 'penelitian.id')
            .where(q =>
                q.where('ketua_dosen_penelitian', dosen_id)
                    .orWhere('anggota_penelitian.id_dosen', dosen_id)
            )

    }

    if (search) {
        query.where(q =>
            q.where('nama_proposal', 'ILIKE', `%${search}%`)
                .orWhere('status', 'ILIKE', `%${search}%`)
        )
    }

    const data = await query
        .countDistinct('penelitian.id as total')
        .first()

    return data || 0
}

exports.getAnalyticPenelitian = async (year, dosen_id) => {
    const query = db("penelitian")
        .whereRaw('EXTRACT(year FROM periode_awal) = ?', [year])
        .select(
            'status',
            db.raw('EXTRACT(MONTH FROM periode_awal) AS month'),
            db.raw('EXTRACT(year FROM periode_awal) AS year'),
            db.raw('count(penelitian.id) as total'),
        )
        .whereIn('status', ['Disetujui', 'Selesai'])
        .groupBy('status')
        .groupBy('month')
        .groupBy('year')
        .orderBy('month')
        .orderBy('year')

    if (dosen_id) {
        query
            .leftJoin('anggota_penelitian', 'anggota_penelitian.id_penelitian', 'penelitian.id')
            .where(q =>
                q.where('ketua_dosen_penelitian', dosen_id)
                    .orWhere('anggota_penelitian.id_dosen', dosen_id)
            )
    }

    return query
}

exports.getBiayaPenelitian = async (year, dosen_id) => {
    const query = db("penelitian")
        .whereRaw('EXTRACT(year FROM periode_awal) = ?', [year])
        .select(
            'status',
            db.raw('EXTRACT(MONTH FROM periode_awal) AS month'),
            db.raw('EXTRACT(year FROM periode_awal) AS year'),
            db.raw('sum(biaya_yang_disetujui) as total')
        )
        .whereIn('status', ['Disetujui', 'Selesai'])
        .groupBy('status')
        .groupBy('month')
        .groupBy('year')
        .orderBy('month')
        .orderBy('year')

    if (dosen_id) {
        query
            .leftJoin('anggota_penelitian', 'anggota_penelitian.id_penelitian', 'penelitian.id')
            .where(q =>
                q.where('ketua_dosen_penelitian', dosen_id)
                    .orWhere('anggota_penelitian.id_dosen', dosen_id)
            )
    }

    return query
}

exports.getTotalPenelitianSelesai = async (dosen_id) => {
    const query = db('penelitian')
        .count('penelitian.id as total')
        .first()
        .where({status: "Selesai"})

    if (dosen_id) {
        query
            .leftJoin('anggota_penelitian', 'anggota_penelitian.id_penelitian', 'penelitian.id')
            .where(q =>
                q.where('ketua_dosen_penelitian', dosen_id)
                    .orWhere('anggota_penelitian.id_dosen', dosen_id)
            )
    }

    return query
}

exports.getTotalPenelitianBatal = async (dosen_id) => {
    const query = db('penelitian')
        .count('penelitian.id as total')
        .first()
        .where({status: "Batal"})

    if (dosen_id) {
        query
            .leftJoin('anggota_penelitian', 'anggota_penelitian.id_penelitian', 'penelitian.id')
            .where(q =>
                q.where('ketua_dosen_penelitian', dosen_id)
                    .orWhere('anggota_penelitian.id_dosen', dosen_id)
            )
    }

    return query
}

exports.getTotalPenelitianSedangBerlangsung = async (dosen_id) => {
    const query = db('penelitian')
        .count('penelitian.id as total')
        .first()
        .whereBetween(db.raw('current_date'), [db.raw('periode_awal'), db.raw('periode_akhir')])

    if (dosen_id) {
        query
            .leftJoin('anggota_penelitian', 'anggota_penelitian.id_penelitian', 'penelitian.id')
            .where(q =>
                q.where('ketua_dosen_penelitian', dosen_id)
                    .orWhere('anggota_penelitian.id_dosen', dosen_id)
            )
    }

    return query
}

exports.addPenelitian = async (data, anggota, dokumen) => {
    const trx = await db.transaction()
    try {
        switch (dokumen.length) {
            case 0:
                data.status = 'Draft'
                break
            case 1:
                data.status = 'Diajukan'
                break
            case 2:
            case 3:
            case 4:
                data.status = 'Disetujui'
                break
            case 5:
                data.status = 'Selesai'
                break
            default:
                await trx.rollback()
                throw new ServiceError(`dokumen length is ${dokumen.length}`, HTTP_STATUS.BAD_REQUEST)
        }

        data.status_updated_at = trx.raw('CURRENT_TIMESTAMP')

        data.ketua_dosen_penelitian = trx('dosen').where({nomor_induk_dosen_nasional: data.ketua_dosen_penelitian}).first('id')

        const [{id}] = await trx('penelitian').insert(data, 'id')

        for (const nisn_dosen of anggota.list_dosen) {
            await trx('anggota_penelitian').insert({
                id_penelitian: id,
                id_dosen: trx('dosen').where({nomor_induk_dosen_nasional: nisn_dosen}).first('id'),
            })
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
                tipe_dokumen: trx('master_tipe_penelitian_dokumen').where({nama: fieldname}).first('id'),
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
            'biaya_yang_disetujui',
            'biaya_yang_diajukan',
            'periode_awal',
            'created_at',
            'periode_akhir',
            'master_subkategori_penelitian.id as subkategori',
            'master_kategori_penelitian.id as kategori',
            'status',
            'dosen.nomor_induk_dosen_nasional as ketua_dosen_penelitian',
            'dosen.nama_dosen as nama_ketua_dosen_penelitian',
        )
        .where('penelitian.id', id)
        .join('master_subkategori_penelitian', 'master_subkategori_penelitian.id', 'penelitian.id_subkategori_penelitian')
        .join('master_kategori_penelitian', 'master_kategori_penelitian.id', 'master_subkategori_penelitian.id_master_kategori_penelitian')
        .join('dosen', 'dosen.id', 'penelitian.ketua_dosen_penelitian')

exports.getAnggotaDosenByPenelitianId = async id_penelitian =>
    await db('anggota_penelitian')
        .leftJoin('dosen', 'dosen.id', 'anggota_penelitian.id_dosen')
        .select('dosen.nomor_induk_dosen_nasional as nidn', 'nama_dosen')
        .where({id_penelitian})
        .whereNotNull('dosen.nomor_induk_dosen_nasional')

exports.getAnggotaMahasiswaByPenelitianId = async id_penelitian =>
    await db('anggota_penelitian')
        .leftJoin('mahasiswa', 'mahasiswa.id', 'anggota_penelitian.id_mahasiswa')
        .select('mahasiswa.nomor_induk_mahasiswa as nim', 'nama_mahasiswa')
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
        data.ketua_dosen_penelitian = trx('dosen').where({nomor_induk_dosen_nasional: data.ketua_dosen_penelitian}).first('id')
        data.updated_at = trx.raw('current_timestamp')

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

        for (const nisn_dosen of anggota.list_dosen) {
            await trx('anggota_penelitian').insert({
                id_penelitian: id,
                id_dosen: trx('dosen').where({nomor_induk_dosen_nasional: nisn_dosen}).first('id'),
            })
        }

        for (const {fieldname, filename, originalname} of dokumen) {

            const documentData = await trx('dokumen_penelitian').first(
                'file'
            ).where({
                id_penelitian: id,
                tipe_dokumen: trx('master_tipe_penelitian_dokumen').where({nama: fieldname}).first('id'),
            })

            if (documentData) {
                try {
                    fs.unlinkSync(path.join(__dirname, "../", documentData.file))
                } catch (e) {
                    console.log(e)
                }
                await trx('dokumen_penelitian').update({
                    file: `/uploads/${fieldname}/${filename}`,
                    original_filename: originalname
                }).where({
                    id_penelitian: id,
                    tipe_dokumen: trx('master_tipe_penelitian_dokumen').where({nama: fieldname}).first('id'),
                })
            } else {
                await trx('dokumen_penelitian').insert({
                    file: `/uploads/${fieldname}/${filename}`,
                    original_filename: originalname,
                    id_penelitian: id,
                    tipe_dokumen: trx('master_tipe_penelitian_dokumen').where({nama: fieldname}).first('id'),
                });
            }
        }

        const {total} = await trx('dokumen_penelitian').where({id_penelitian: id}).count('id as total').first()

        switch (parseInt(total)) {
            case 1:
                await trx('penelitian').update({
                    status: 'Diajukan',
                    status_updated_at: trx.raw('CURRENT_TIMESTAMP')
                }).where({id})
                break
            case 2:
            case 3:
            case 4:
                await trx('penelitian').update({
                    status: 'Disetujui',
                    status_updated_at: trx.raw('CURRENT_TIMESTAMP')
                }).where({id})
                break
            case 5:
                await trx('penelitian').update({
                    status: 'Selesai',
                    status_updated_at: trx.raw('CURRENT_TIMESTAMP')
                }).where({id})
                break
        }

        await trx.commit()
    } catch (e) {
        await trx.rollback()
        throw e
    }
}

exports.cancelPenelitian = async id =>
    await db('penelitian').where({id}).update({status: "Batal", status_updated_at: db.raw('CURRENT_TIMESTAMP')})

exports.getProposalPenelitian = async id =>
    await db('dokumen_penelitian')
        .where({id_penelitian: id})
        .pluck('file')

exports.deletePenelitian = async id => {
    await db('penelitian').where({id}).del()
}

exports.getMaxYear = async (dosen_id) => {
    const query = db('penelitian').first().max(db.raw('EXTRACT(YEAR FROM periode_awal)')).whereIn('status', ['Disetujui', 'Selesai']).as('max_year')
    if (dosen_id) {
        query
            .leftJoin('anggota_penelitian', 'anggota_penelitian.id_penelitian', 'penelitian.id')
            .where(q =>
                q.where('ketua_dosen_penelitian', dosen_id)
                    .orWhere('anggota_penelitian.id_dosen', dosen_id)
            )
    }

    return query;
}

exports.getMinYear = async (dosen_id) => {
    const query = db('penelitian').first().min(db.raw('EXTRACT(YEAR FROM periode_awal)')).whereIn('status', ['Disetujui', 'Selesai']).as('min_year')
    if (dosen_id) {
        query
            .leftJoin('anggota_penelitian', 'anggota_penelitian.id_penelitian', 'penelitian.id')
            .where(q =>
                q.where('ketua_dosen_penelitian', dosen_id)
                    .orWhere('anggota_penelitian.id_dosen', dosen_id)
            )
    }

    return query;
}