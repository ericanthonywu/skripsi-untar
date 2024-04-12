const {
    getAllKategoriData,
    getKategoriById, getSubKategoriById, getSubKategoriByKategoriId
} = require("../../services/kategoriPenelitianServices");
const {getPenelitianById, getTotalPenelitianSelesai, getTotalPenelitian, getTotalPenelitianBatal,
    getTotalPenelitianSedangBerlanjut
} = require("../../services/penelitianServices");

exports.loginPage = (req, res) => {
    res.render('dosen/page/login')
}

exports.indexPage = async (req, res) => {
    res.render('dosen/page/dashboard', {
        data: {
            total_penelitian: await getTotalPenelitian(),
            total_penelitian_selesai: await getTotalPenelitianSelesai(),
            total_penelitian_batal: await getTotalPenelitianBatal(),
            total_penelitian_sedang_berlanjut: await getTotalPenelitianSedangBerlanjut()
        }
    })
}

exports.penelitianPage = (req, res) => {
    res.render('dosen/page/penelitian/view_penelitian')
}

exports.tambahPenelitianPage = async (req, res) => {
    try {
        res.render('dosen/page/penelitian/tambah_penelitian', {
            kategori: await getAllKategoriData()
        })
    } catch (e) {
        console.log(e)
        res.send('internal server error')
    }
}

exports.ubahPenelitianPage = async (req, res, next) => {
    try {
        const {id} = req.params

        const data = await getPenelitianById(id)

        res.render('dosen/page/penelitian/ubah_penelitian', {
            kategori_list: await getAllKategoriData(),
            subkategori_list: await getSubKategoriByKategoriId(data.data.kategori),
            ...data,
        })
    } catch (e) {
        console.log(e)
        res.send('internal server error')
    }
}

exports.kategoriPage = (req, res) => {
    res.render('dosen/page/kategori/view_kategori')
}

exports.tambahKategoriPage = (req, res) => {
    res.render('dosen/page/kategori/tambah_kategori')
}

exports.ubahKategoriPage = async (req, res) => {
    const {id} = req.params
    res.render('dosen/page/kategori/ubah_kategori', {
        data: await getKategoriById(id)
    })
}

exports.subkategoriPage = async (req, res) => {
    const {kategoriId} = req.params

    const {nama} = await getKategoriById(kategoriId)
    res.render('dosen/page/kategori/subkategori/view_subkategori', {
        kategori: {
            id: kategoriId, nama
        }
    })
}

exports.tambahSubkategoriPage = async (req, res) => {
    const {kategoriId} = req.params
    res.render('dosen/page/kategori/subkategori/tambah_subkategori', {
        id: kategoriId
    })
}

exports.ubahSubkategoriPage = async (req, res) => {
    const {id, kategoriId} = req.params
    const data =  await getSubKategoriById(id)
    res.render('dosen/page/kategori/subkategori/ubah_subkategori', {
        data,
        kategoriId
    })
}