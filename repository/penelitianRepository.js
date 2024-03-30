const db = require("../config/database/connection")

exports.getPenelitian = async (search, offset, limit, sort_column, sort_direction) =>
    await db("penelitian")
        .select("penelitian.id", "nama_proposal", "harga", 'periode_awal', 'periode_akhir', 'master_kategori_penelitian.nama as kategori_penelitian' ,'master_subkategori_penelitian.nama as subkategori_penelitian')
        .join('master_kategori_penelitian', 'master_kategori_penelitian.id', 'penelitian.id_kategori_penelitian')
        .join('master_subkategori_penelitian', 'master_kategori_penelitian.id', 'master_subkategori_penelitian.id_master_kategori_penelitian')
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

    return data.total || 0
}

exports.addPenelitian = async data => {
    await db('penelitian').insert(data)
}

exports.ubahPenelitian = async (data, id) => {
    await db('penelitian').update(data).where({id})
}

exports.deletePenelitian = async id => {
    await db('penelitian').where({id}).del()
}