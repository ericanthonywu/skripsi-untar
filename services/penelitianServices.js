const penelitianRepository = require('../repository/penelitianRepository')
const moment = require("moment");

exports.getPenelitianById = async id => {
    const data = await penelitianRepository.getPenelitianById(id)
    const list_dosen = await penelitianRepository.getAnggotaDosenByPenelitianId(id)
    const list_mahasiswa = await penelitianRepository.getAnggotaMahasiswaByPenelitianId(id)
    const list_proposal = await penelitianRepository.getDokumenPenelitianByPenelitianId(id)

    data.periode_awal = moment(data.periode_awal).format('MMMM YYYY')
    data.periode_akhir = moment(data.periode_akhir).format('MMMM YYYY')

    const proper_list_proposal = {}

    for (const {nama, file, original_filename} of list_proposal) {
        proper_list_proposal[nama] = {
            file, original_filename
        }
    }
    return {
        data,
        list_mahasiswa,
        list_dosen,
        list_proposal: proper_list_proposal
    }
}

exports.addPenelitianServices = async (data, anggota, file) => {
    await penelitianRepository.addPenelitian(data, anggota, file)
}

exports.deletePenelitianServices = async id => {
    await penelitianRepository.deletePenelitian(id)
}