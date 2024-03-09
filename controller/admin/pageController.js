exports.loginPage = (req,res) => {
    res.render('admin/page/login')
}

exports.indexPage = (req,res) => {
    res.render('admin/page/dashboard')
}

exports.mahasiswaPage = (req,res) => {
    res.render('admin/page/mahasiswa')
}
exports.dosenPage = (req,res) => {
    res.render('admin/page/dosen')
}

exports.tambahDosenPage = (req,res) => {
    res.render('admin/page/tambah_dosen')
}