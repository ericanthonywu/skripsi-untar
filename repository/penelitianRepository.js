const db = require("../config/database/connection")

exports.getPenelitian = async (search, offset, limit, sort_column, sort_direction) =>
    await db("penelitian")
        .select("id", "nama_proposal", "harga", 'periode_awal', 'periode_akhir')
        .join('master_kategori_proposal', 'master_kategori_proposal.id', 'penelitian.id_kategori_penelitian')
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

    return data.total
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