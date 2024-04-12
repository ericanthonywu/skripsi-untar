const datatableService = require("../../services/datatableServices")

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

exports.dosenDatatableController = async (req, res, next) => {
    try {
        const {draw, start: offset, length: limit, search, sort_column, sort_direction} = req.query
        const {data, total_data} = await datatableService.getDosenDatatable(search.value, offset, limit, sort_column, sort_direction)

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

exports.mahasiswaDatatableController = async (req, res, next) => {
    try {
        const {draw, start: offset, length: limit, search, sort_column, sort_direction} = req.query
        const {data, total_data} = await datatableService.getMahasiswaDatatable(search.value, offset, limit, sort_column, sort_direction)

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

exports.subkategoriDatatableController = async (req, res, next) => {
    try {
        const {id} = req.params
        const data = await datatableService.getSubkategoriDatatable(id)
        res.json({data})
    } catch (e) {
        next(e)
    }
}

exports.adminDatatableController = async (req, res, next) => {
    try {
        const data = await datatableService.getAdminDatatable()
        res.json({data})
    } catch (e) {
        next(e)
    }
}