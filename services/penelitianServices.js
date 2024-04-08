const penelitianRepository = require('../repository/penelitianRepository')
const moment = require("moment");
const fs = require("fs");
const path = require("node:path");

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

exports.ubahPenelitianServices = async (data, anggota, file) => {
    const listFile = await penelitianRepository.getProposalPenelitian(data.id)
    await penelitianRepository.ubahPenelitian(data.id, data, anggota, file)
    for (const file of listFile) {
        try {
            fs.unlinkSync(path.join(__dirname, file))
        } catch (e) {

        }
    }
}

exports.deletePenelitianServices = async id => {
    const listFile = await penelitianRepository.getProposalPenelitian(id)
    await penelitianRepository.deletePenelitian(id)
    for (const file of listFile) {
        fs.unlinkSync(path.join(__dirname, `../`, file))
    }
}