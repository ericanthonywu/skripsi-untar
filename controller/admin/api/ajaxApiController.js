const {getSubKategoriByKategoriId} = require("../../../services/kategoriPenelitianServices");
exports.getSubKategoriByKategoriIdController = async (req, res, next) => {
    try {
        const {kategoriId} = req.params
        const data = await getSubKategoriByKategoriId(kategoriId)

        res.status(200).json(data)
    } catch (e) {
        next(e)
    }
}