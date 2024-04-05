const {
    getAllKategoriData,
    getKategoriById, getSubKategoriById
} = require("../../services/kategoriPenelitianServices");
const {getAllDosen, getDosenById} = require("../../services/dosenServices");
const {getAllMahasiswa} = require("../../services/mahasiswaServices");

exports.loginPage = (req, res) => {
    res.render('admin/page/login')
}

exports.indexPage = (req, res) => {
    res.render('admin/page/dashboard')
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

exports.ubahMahasiswaPage = (req, res) => {
    res.render('admin/page/mahasiswa/ubah_mahasiswa')
}

exports.penelitianPage = (req, res) => {
    res.render('admin/page/penelitian/view_penelitian')
}

exports.tambahPenelitianPage = async (req, res, next) => {
    try {
        res.render('admin/page/penelitian/tambah_penelitian', {
            kategori: await getAllKategoriData(),
            dosen: await getAllDosen(),
            mahasiswa: await getAllMahasiswa()
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