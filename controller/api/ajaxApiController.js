    const kategoriPenelitianServices = require("../../services/kategoriPenelitianServices");
    const penelitianServices = require("../../services/penelitianServices");
    const dosenServices = require("../../services/dosenServices");
    const mahasiswaServices = require("../../services/mahasiswaServices");
    const adminServices = require("../../services/adminServices");
    const notificationServices = require("../../services/notificationServices")
    const XLSX = require('xlsx');
    const fs = require('fs');
    const {HTTP_STATUS} = require("../../constant/httpStatusConstant");

    exports.getSubKategoriByKategoriIdController = async (req, res, next) => {
        try {
            const {kategoriId} = req.params
            const data = await kategoriPenelitianServices.getSubKategoriByKategoriId(kategoriId)

            res.status(HTTP_STATUS.OK).json(data)
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

            let {
                nama_proposal,
                biaya_yang_diajukan,
                biaya_yang_disetujui,
                list_dosen,
                list_mahasiswa,
                subkategori,
                tipe_periode,
                periode_tahun,
                ketua_dosen_penelitian
            } = req.body

            let periode_awal;
            let periode_akhir;

            switch (tipe_periode) {
                case "periode_1":
                    periode_awal = `${periode_tahun}-02-01` // feb
                    periode_akhir = `${periode_tahun}-06-01` // juni
                    break
                case "periode_2":
                    periode_awal = `${periode_tahun}-08-01` // agustus
                    periode_akhir = `${parseInt(periode_tahun) + 1}-01-01` // januari
                    break
                default:
                    res.status(HTTP_STATUS.BAD_REQUEST).json({message: '', error: {message: 'status periode not valid'}})
            }

            await penelitianServices.addPenelitianServices({
                nama_proposal,
                biaya_yang_diajukan,
                biaya_yang_disetujui,
                periode_awal,
                periode_akhir,
                id_subkategori_penelitian: subkategori,
                ketua_dosen_penelitian
            }, {
                list_dosen,
                list_mahasiswa
            }, req.files)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.addPenelitianExcelController = async (req, res, next) => {
        try {
            const workbook = XLSX.readFile(req.files.file[0].path);
            fs.unlinkSync(req.files.file[0].path)
            const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

            let dosen_id = 0
            if (res.locals.user.role === "dosen") {
                dosen_id = res.locals.user.id
            }

            console.log(xlData)
            await penelitianServices.addMultiplePenelitianServices(xlData, dosen_id)

            res.sendStatus(HTTP_STATUS.OK)
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

            let {
                id,
                nama_proposal,
                biaya_yang_diajukan,
                biaya_yang_disetujui,
                list_dosen,
                list_mahasiswa,
                subkategori,
                tipe_periode,
                periode_tahun,
                ketua_dosen_penelitian
            } = req.body

            let periode_awal;
            let periode_akhir;

            switch (tipe_periode) {
                case "periode_1":
                    periode_awal = `${periode_tahun}-02-01` // feb
                    periode_akhir = `${periode_tahun}-06-01` // juni
                    break
                case "periode_2":
                    periode_awal = `${periode_tahun}-08-01` // agustus
                    periode_akhir = `${parseInt(periode_tahun) + 1}-01-01` // januari
                    break
                default:
                    res.status(HTTP_STATUS.BAD_REQUEST).json({message: '', error: {message: 'status periode not valid'}})
            }

            await penelitianServices.ubahPenelitianServices({
                id,
                nama_proposal,
                biaya_yang_diajukan,
                biaya_yang_disetujui,
                periode_awal,
                periode_akhir,
                id_subkategori_penelitian: subkategori,
                ketua_dosen_penelitian
            }, {
                list_dosen,
                list_mahasiswa
            }, req.files)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.cancelPenelitianController = async (req, res, next) => {
        try {
            const {id} = req.params
            await penelitianServices.cancelPenelitianServices(id)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.deletePenelitianController = async (req, res, next) => {
        try {
            const {id} = req.params

            await penelitianServices.deletePenelitianServices(id)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.addKategoriController = async (req, res, next) => {
        try {
            const {nama} = req.body

            await kategoriPenelitianServices.addKategori(nama)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.ubahKategoriController = async (req, res, next) => {
        try {
            const {id, nama} = req.body

            await kategoriPenelitianServices.updateKategori(id, nama)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.deleteKategoriController = async (req, res, next) => {
        try {
            const {id} = req.params

            await kategoriPenelitianServices.deleteKategori(id)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.addSubkategoriController = async (req, res, next) => {
        try {
            const {nama, id_master_kategori_penelitian} = req.body

            await kategoriPenelitianServices.addSubkategori(nama, id_master_kategori_penelitian)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.updateSubkategoriController = async (req, res, next) => {
        try {
            const {nama, id} = req.body

            await kategoriPenelitianServices.updateSubkategori(nama, id)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.deleteSubkategoriController = async (req, res, next) => {
        try {
            const {id} = req.params

            await kategoriPenelitianServices.deleteSubkategori(id)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.addDosen = async (req, res, next) => {
        try {
            const data = req.body

            await dosenServices.addDosen(data)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.addDosenByExcel = async (req, res, next) => {
        try {
            const workbook = XLSX.readFile(req.files.file[0].path);
            fs.unlinkSync(req.files.file[0].path)
            const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

            await dosenServices.addMultipleDosen(xlData)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.addMahasiswaByExcel = async (req, res, next) => {
        try {
            const workbook = XLSX.readFile(req.files.file[0].path);
            fs.unlinkSync(req.files.file[0].path)
            const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

            await mahasiswaServices.addMultipleMahasiswa(xlData)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.updateDosen = async (req, res, next) => {
        try {
            const data = req.body

            await dosenServices.updateDosen(data)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.deleteDosen = async (req, res, next) => {
        try {
            const {id} = req.params

            await dosenServices.deleteDosen(id)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.addMahasiswa = async (req, res, next) => {
        try {
            const data = req.body

            await mahasiswaServices.addMahasiswa(data)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.updateMahasiswa = async (req, res, next) => {
        try {
            const data = req.body

            await mahasiswaServices.updateMahasiswa(data)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.deleteMahasiswa = async (req, res, next) => {
        try {
            const {id} = req.params

            await mahasiswaServices.deleteMahasiswa(id)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.checkNisnDosenExists = async (req, res, next) => {
        try {
            const {nisn} = req.body

            const data = await dosenServices.checkNISNDosenExists(nisn)

            res.status(HTTP_STATUS.OK).json({data})
        } catch (e) {
            next(e)
        }
    }

    exports.findDosenByNameAndNIDN = async (req, res, next) => {
        try {
            const {search, exclude} = req.query

            const data = await dosenServices.findDosenByNameAndNIDN(search, exclude)

            res.status(HTTP_STATUS.OK).json({data})
        } catch (e) {
            next(e)
        }
    }

    exports.checkNIMMahasiswaExists = async (req, res, next) => {
        try {
            const {nim} = req.body

            const data = await mahasiswaServices.checkNIMMahasiswaExists(nim)

            res.status(HTTP_STATUS.OK).json({data})
        } catch (e) {
            next(e)
        }
    }

    exports.findMahasiswaByNameAndNIDN = async (req, res, next) => {
        try {
            const {search, exclude} = req.query

            const data = await mahasiswaServices.findMahasiswaByNameAndNIDN(search, exclude)

            res.status(HTTP_STATUS.OK).json({data})
        } catch (e) {
            next(e)
        }
    }

    exports.addAdmin = async (req, res, next) => {
        try {
            const data = req.body

            await adminServices.addAdmin(data.username, data.password)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.updateAdmin = async (req, res, next) => {
        try {
            const data = req.body

            await adminServices.updateAdmin(data.id, data)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.deleteAdmin = async (req, res, next) => {
        try {
            const {id} = req.params

            await adminServices.deleteAdmin(id)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }

    exports.readNotif = async (req, res, next) => {
        try {
            const {id} = req.body

            let dosen_id = 0
            if (res.locals.user.role === "dosen") {
                dosen_id = res.locals.user.id
            }

            await notificationServices.readNotification(id, dosen_id)

            res.sendStatus(HTTP_STATUS.OK)
        } catch (e) {
            next(e)
        }
    }