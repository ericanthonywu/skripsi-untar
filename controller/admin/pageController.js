const {getAllKategoriData} = require("../../services/kategoriPenelitianServices");
const {getAllDosen} = require("../../services/dosenServices");
const {getAllMahasiswa} = require("../../services/mahasiswaServices");
exports.loginPage = (req,res) => {
    res.render('admin/page/login')
}

exports.indexPage = (req,res) => {
    res.render('admin/page/dashboard')
}

exports.penelitianPage = (req,res) => {
    res.render('admin/page/penelitian/view_penelitian')
}

exports.tambahPenelitianPage = async (req,res, next) => {
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

exports.kategoriPage = (req,res) => {
    res.render('admin/page/kategori/view_kategori')
}

exports.tambahKategoriPage = (req,res) => {
    res.render('admin/page/kategori/tambah_kategori')
}