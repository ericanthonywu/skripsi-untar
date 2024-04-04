const datatableService = require("../../../services/datatableServices")

exports.penelitianDatatableController = async (req, res, next) => {
    try {
        const {draw, start: offset, length: limit, search, sort_column, sort_direction} = req.query
        const {data, total_data} = await datatableService.getPenelitianDatatable(search.value, offset, limit, sort_column, sort_direction)

        res.json({
            draw: parseInt(draw),
            recordsFiltered: total_data || 0,
            recordsTotal: data?.length || 0,
            data: data ?? []
        })
    } catch (e) {
        next(e)
    }
}

exports.kategoriDatatableController = async (req, res, next) => {
    try {
        const data = await datatableService.getKategoriDatatable()
        res.json({data})
    } catch (e) {
        next(e)
    }
}