const penelitianServices = require('../../services/penelitianServices')
const moment = require("moment");
const {HTTP_STATUS} = require("../../constant/httpStatusConstant");

exports.getPenelitian = async (req, res, next) => {
    try {
        const {year = moment().year()} = req.params
        const { kategori, subkategori} = req.query
        let dosen_id = 0
        if (res.locals.user.role === "dosen") {
            dosen_id = res.locals.user.id
        }
        const data = await penelitianServices.getPenelitianAnalytic({kategori, subkategori}, year, dosen_id)

        res.status(HTTP_STATUS.OK).json(data)
    } catch (e) {
        next(e)
    }
}

exports.getBiayaPenelitian = async (req, res, next) => {
    try {
        const {year = moment().year()} = req.params
        const { kategori, subkategori} = req.query
        let dosen_id = 0
        if (res.locals.user.role === "dosen") {
            dosen_id = res.locals.user.id
        }
        const data = await penelitianServices.getBiayaPenelitianAnalytic({kategori, subkategori}, year, dosen_id)

        res.status(HTTP_STATUS.OK).json(data)
    } catch (e) {
        next(e)
    }
}