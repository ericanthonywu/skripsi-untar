const {
    getAllKategoriData,
    getKategoriById, getSubKategoriById, getSubKategoriByKategoriId
} = require("../../services/kategoriPenelitianServices");
const {getDosenById} = require("../../services/dosenServices");
const {getMahasiswaById} = require("../../services/mahasiswaServices");
const {getPenelitianById, getTotalPenelitianSelesai, getTotalPenelitian, getTotalPenelitianBatal,
    getTotalPenelitianSedangBerlanjut
} = require("../../services/penelitianServices");
const {getAdminById} = require("../../services/adminServices");

exports.loginPage = (req, res) => {
    res.render('admin/page/login')
}

exports.indexPage = async (req, res) => {
    res.render('admin/page/dashboard', {
        data: {
            total_penelitian: await getTotalPenelitian(),
            total_penelitian_selesai: await getTotalPenelitianSelesai(),
            total_penelitian_batal: await getTotalPenelitianBatal(),
            total_penelitian_sedang_berlanjut: await getTotalPenelitianSedangBerlanjut()
        }
    })
}

exports.dosenPage = (req, res) => {
    res.render('admin/page/dosen/view_dosen')
}

exports.tambahDosenPage = (req, res) => {
    res.render('admin/page/dosen/tambah_dosen')
}

exports.ubahDosenPage = async (req, res) => {
    const {id} = req.params
    res.render('admin/page/dosen/ubah_dosen', {
        data: await getDosenById(id)
    })
}

exports.mahasiswaPage = (req, res) => {
    res.render('admin/page/mahasiswa/view_mahasiswa')
}

exports.tambahMahasiswaPage = (req, res) => {
    res.render('admin/page/mahasiswa/tambah_mahasiswa')
}

exports.ubahMahasiswaPage = async (req, res) => {
    const {id} = req.params
    res.render('admin/page/mahasiswa/ubah_mahasiswa', {
        data: await getMahasiswaById(id)
    })
}

exports.penelitianPage = (req, res) => {
    res.render('admin/page/penelitian/view_penelitian')
}

exports.tambahPenelitianPage = async (req, res) => {
    try {
        res.render('admin/page/penelitian/tambah_penelitian', {
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

        res.render('admin/page/penelitian/ubah_penelitian', {
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
    res.render('admin/page/kategori/view_kategori')
}

exports.tambahKategoriPage = (req, res) => {
    res.render('admin/page/kategori/tambah_kategori')
}

exports.ubahKategoriPage = async (req, res) => {
    const {id} = req.params
    res.render('admin/page/kategori/ubah_kategori', {
        data: await getKategoriById(id)
    })
}

exports.subkategoriPage = async (req, res) => {
    const {kategoriId} = req.params

    const {nama} = await getKategoriById(kategoriId)
    res.render('admin/page/kategori/subkategori/view_subkategori', {
        kategori: {
            id: kategoriId, nama
        }
    })
}

exports.tambahSubkategoriPage = async (req, res) => {
    const {kategoriId} = req.params
    res.render('admin/page/kategori/subkategori/tambah_subkategori', {
        id: kategoriId
    })
}

exports.ubahSubkategoriPage = async (req, res) => {
    const {id, kategoriId} = req.params
    const data =  await getSubKategoriById(id)
    res.render('admin/page/kategori/subkategori/ubah_subkategori', {
        data,
        kategoriId
    })
}

exports.adminPage = async (req, res) => {
    res.render('admin/page/admin/view_admin')
}

exports.tambahAdminPage = async (req, res) => {
    res.render('admin/page/admin/tambah_admin')
}

exports.ubahAdminPage = async (req, res) => {
    const {id} = req.params
    res.render('admin/page/admin/ubah_admin', {
        data: await getAdminById(id)
    })
}