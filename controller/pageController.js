const {
    getAllKategoriData,
    getKategoriById, getSubKategoriById, getSubKategoriByKategoriId
} = require("../services/kategoriPenelitianServices");
const {getDosenById} = require("../services/dosenServices");
const {getMahasiswaById} = require("../services/mahasiswaServices");
const {getPenelitianById, getTotalPenelitianSelesai, getTotalPenelitian, getTotalPenelitianBatal,
    getTotalPenelitianSedangBerlangsung, getMaxAndMinYearServices
} = require("../services/penelitianServices");
const {getAdminById} = require("../services/adminServices");

exports.loginAdminPage = (req, res) => {
    res.render('page/login_admin')
}

exports.loginDosenPage = (req, res) => {
    res.render('page/login_dosen')
}

exports.indexPage = async (req, res) => {
    let dosen_id = 0
    if (res.locals.user.role === "dosen") {
        dosen_id = res.locals.user.id
    }
    res.render('page/dashboard', {
        data: {
            total_penelitian: await getTotalPenelitian(dosen_id),
            total_penelitian_selesai: await getTotalPenelitianSelesai(dosen_id),
            total_penelitian_batal: await getTotalPenelitianBatal(dosen_id),
            total_penelitian_sedang_berlangsung: await getTotalPenelitianSedangBerlangsung(dosen_id),
            ...await getMaxAndMinYearServices(dosen_id)
        }
    })
}

exports.dosenPage = (req, res) => {
    res.render('page/dosen/view_dosen')
}

exports.tambahDosenPage = (req, res) => {
    res.render('page/dosen/tambah_dosen')
}

exports.ubahDosenPage = async (req, res) => {
    const {id} = req.params
    res.render('page/dosen/ubah_dosen', {
        data: await getDosenById(id)
    })
}

exports.mahasiswaPage = (req, res) => {
    res.render('page/mahasiswa/view_mahasiswa')
}

exports.tambahMahasiswaPage = (req, res) => {
    res.render('page/mahasiswa/tambah_mahasiswa')
}

exports.ubahMahasiswaPage = async (req, res) => {
    const {id} = req.params
    res.render('page/mahasiswa/ubah_mahasiswa', {
        data: await getMahasiswaById(id),
    })
}

exports.penelitianPage = (req, res) => {
    res.render('page/penelitian/view_penelitian')
}

exports.tambahPenelitianPage = async (req, res) => {
    try {
        let dosen_id = 0
        if (res.locals.user.role === "dosen") {
            dosen_id = res.locals.user.id
        }
        res.render('page/penelitian/tambah_penelitian', {
            kategori: await getAllKategoriData(),
            ketua_dosen_penelitian: res.locals.user.role === "dosen" ? await getDosenById(dosen_id) : undefined
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

        res.render('page/penelitian/ubah_penelitian', {
            kategori_list: await getAllKategoriData(),
            subkategori_list: await getSubKategoriByKategoriId(data.data.kategori),
            moment: require('moment'),
            ...data,
            ketua_dosen_penelitian: res.locals.user.role === "dosen" ? res.locals.user.id : undefined
        })
    } catch (e) {
        console.log(e)
        res.send('internal server error')
    }
}

exports.kategoriPage = (req, res) => {
    res.render('page/kategori/view_kategori')
}

exports.tambahKategoriPage = (req, res) => {
    res.render('page/kategori/tambah_kategori')
}

exports.ubahKategoriPage = async (req, res) => {
    const {id} = req.params
    res.render('page/kategori/ubah_kategori', {
        data: await getKategoriById(id)
    })
}

exports.subkategoriPage = async (req, res) => {
    const {kategoriId} = req.params

    const {nama} = await getKategoriById(kategoriId)
    res.render('page/kategori/subkategori/view_subkategori', {
        kategori: {
            id: kategoriId, nama
        }
    })
}

exports.tambahSubkategoriPage = async (req, res) => {
    const {kategoriId} = req.params
    res.render('page/kategori/subkategori/tambah_subkategori', {
        id: kategoriId
    })
}

exports.ubahSubkategoriPage = async (req, res) => {
    const {id, kategoriId} = req.params
    const data =  await getSubKategoriById(id)
    res.render('page/kategori/subkategori/ubah_subkategori', {
        data,
        kategoriId
    })
}

exports.adminPage = async (req, res) => {
    res.render('page/admin/view_admin')
}

exports.tambahAdminPage = async (req, res) => {
    res.render('page/admin/tambah_admin')
}

exports.ubahAdminPage = async (req, res) => {
    const {id} = req.params
    res.render('page/admin/ubah_admin', {
        data: await getAdminById(id)
    })
}