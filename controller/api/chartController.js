const penelitianServices = require ('../../services/penelitianServices')
const moment = require("moment");
const {HTTP_STATUS} = require("../../constant/httpStatusConstant");

exports.getPenelitian = async (req, res, next) => {
    try {
        const {year = moment().year()} = req.params
        const data = await penelitianServices.getPenelitianAnalytic(year)

        res.status(HTTP_STATUS.OK).json(data)
    } catch (e) {
        next(e)
    }
}

exports.getBiayaPenelitian = async (req, res, next) => {
    try {
        const {year = moment().year()} = req.params
        const data = await penelitianServices.getBiayaPenelitianAnalytic(year)

        res.status(HTTP_STATUS.OK).json(data)
    } catch (e) {
        next(e)
    }
}