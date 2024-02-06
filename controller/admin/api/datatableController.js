const datatableService = require("../../../services/admin/datatableServices")

exports.mahasiswa = async (req, res, next) => {
    try {
        console.log("query", {
            ...req.query
        })
        const {draw, start: offset, length: limit, search} = req.query
        const {data, total_data} = await datatableService.getMahasiswaDatatable(search.value, offset, limit)

        res.json({
            draw: parseInt(draw),
            recordsFiltered: total_data,
            recordsTotal: data.length,
            data
        })
    } catch (e) {
        next(e)
    }
}