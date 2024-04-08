const kategoriPenelitianServices = require("../../../services/kategoriPenelitianServices");
const penelitianServices = require("../../../services/penelitianServices");
const dosenServices = require("../../../services/dosenServices");
const mahasiswaServices = require("../../../services/mahasiswaServices");
const moment = require("moment");
const XLSX = require('xlsx');

exports.getSubKategoriByKategoriIdController = async (req, res, next) => {
    try {
        const {kategoriId} = req.params
        const data = await kategoriPenelitianServices.getSubKategoriByKategoriId(kategoriId)

        res.status(200).json(data)
    } catch (e) {
        next(e)
    }
}

exports.addPenelitianController = async (req, res, next) => {
    try {
        console.log('body: ', req.body)

        const files = []
        for (const keys of Object.keys(req.files)) {
            files.push(req.files[keys][0])
        }

        req.files = files

        console.log('file: ', req.files)

        let {nama_proposal, biaya, periode_awal, periode_akhir, list_dosen, list_mahasiswa, subkategori} = req.body

        if (typeof list_dosen === 'string') {
            list_dosen = [list_dosen]
        }

        if (typeof list_mahasiswa === 'string') {
            list_mahasiswa = [list_mahasiswa]
        }

        periode_awal = moment(periode_awal, 'MMMM YYYY').format('YYYY-MM-DD')
        periode_akhir = moment(periode_akhir, 'MMMM YYYY').format('YYYY-MM-DD')

        await penelitianServices.addPenelitianServices({nama_proposal, biaya, periode_awal, periode_akhir, id_subkategori_penelitian: subkategori}, {
            list_dosen,
            list_mahasiswa
        }, req.files)

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

exports.ubahPenelitianController = async (req, res, next) => {
    try {
        console.log('body: ', req.body)

        const files = []
        for (const keys of Object.keys(req.files)) {
            files.push(req.files[keys][0])
        }

        req.files = files

        console.log('file: ', req.files)

        let {id, nama_proposal, biaya, periode_awal, periode_akhir, list_dosen, list_mahasiswa, subkategori} = req.body

        if (typeof list_dosen === 'string') {
            list_dosen = [list_dosen]
        }

        if (typeof list_mahasiswa === 'string') {
            list_mahasiswa = [list_mahasiswa]
        }

        periode_awal = moment(periode_awal, 'MMMM YYYY').format('YYYY-MM-DD')
        periode_akhir = moment(periode_akhir, 'MMMM YYYY').format('YYYY-MM-DD')

        await penelitianServices.ubahPenelitianServices({id, nama_proposal, biaya, periode_awal, periode_akhir, id_subkategori_penelitian: subkategori}, {
            list_dosen,
            list_mahasiswa
        }, req.files)

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

exports.deletePenelitianController = async (req, res, next) => {
    try {
        const {id} = req.params

        await penelitianServices.deletePenelitianServices(id)

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

exports.addKategoriController = async (req, res, next) => {
    try {
        const {nama} = req.body

        await kategoriPenelitianServices.addKategori(nama)

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

exports.ubahKategoriController = async (req, res, next) => {
    try {
        const {id, nama} = req.body

        await kategoriPenelitianServices.updateKategori(id, nama)

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

exports.deleteKategoriController = async (req, res, next) => {
    try {
        const {id} = req.params

        await kategoriPenelitianServices.deleteKategori(id)

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

exports.addSubkategoriController = async (req, res, next) => {
    try {
        const {nama, id_master_kategori_penelitian} = req.body

        await kategoriPenelitianServices.addSubkategori(nama, id_master_kategori_penelitian)

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

exports.updateSubkategoriController = async (req, res, next) => {
    try {
        const {nama, id} = req.body

        await kategoriPenelitianServices.updateSubkategori(nama, id)

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

exports.deleteSubkategoriController = async (req, res, next) => {
    try {
        const {id} = req.params

        await kategoriPenelitianServices.deleteSubkategori(id)

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

exports.addDosen = async (req, res, next) => {
    try {
        const data = req.body

        await dosenServices.addDosen(data)

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

exports.addDosenByExcel = async (req, res, next) => {
    try {
        const workbook = XLSX.readFile(req.files.file[0].path);

        let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

        await dosenServices.addMultipleDosen(xlData)

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

exports.addMahasiswaByExcel = async (req, res, next) => {
    try {
        const workbook = XLSX.readFile(req.files.file[0].path);

        let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

        await mahasiswaServices.addMultipleMahasiswa(xlData)

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

exports.updateDosen = async (req, res, next) => {
    try {
        const data = req.body

        await dosenServices.updateDosen(data)

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

exports.deleteDosen = async (req, res, next) => {
    try {
        const {id} = req.params

        await dosenServices.deleteDosen(id)

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

exports.addMahasiswa = async (req, res, next) => {
    try {
        const data = req.body

        await mahasiswaServices.addMahasiswa(data)

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

exports.updateMahasiswa = async (req, res, next) => {
    try {
        const data = req.body

        await mahasiswaServices.updateMahasiswa(data)

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

exports.deleteMahasiswa = async (req, res, next) => {
    try {
        const {id} = req.params

        await mahasiswaServices.deleteMahasiswa(id)

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

exports.checkNisnDosenExists = async (req, res, next) => {
    try {
        const {nisn} = req.body

        const data = await dosenServices.checkNISNDosenExists(nisn)

        res.status(200).json({data})
    } catch (e) {
        next(e)
    }
}

exports.checkNIMMahasiswaExists = async (req, res, next) => {
    try {
        const {nim} = req.body

        const data = await mahasiswaServices.checkNIMMahasiswaExists(nim)

        res.status(200).json({data})
    } catch (e) {
        next(e)
    }
}