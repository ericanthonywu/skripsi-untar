const datatableService = require("../../../services/admin/datatableServices")

exports.mahasiswa = async (req, res, next) => {
    try {
        const {draw, start: offset, length: limit, search, sort_column, sort_direction} = req.query
        const {data, total_data} = await datatableService.getMahasiswaDatatable(search.value, offset, limit,sort_column, sort_direction)

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

exports.dosen = async (req, res, next) => {
    try {
        const {draw, start: offset, length: limit, search, sort_column, sort_direction} = req.query
        const {data, total_data} = await datatableService.getDosenDatatable(search.value, offset, limit, sort_column, sort_direction)

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