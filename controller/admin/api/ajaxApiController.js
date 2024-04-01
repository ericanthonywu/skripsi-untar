const kategoriPenelitianServices = require("../../../services/kategoriPenelitianServices");
const penelitianServices = require("../../../services/penelitianServices");
const moment = require("moment");

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

exports.deletePenelitianController = async (req, res, next) => {
    try {
        const {id} = req.params

        await penelitianServices.deletePenelitianServices(id)

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}