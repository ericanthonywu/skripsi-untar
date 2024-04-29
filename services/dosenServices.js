const dosenRepository = require('../repository/dosenRepository')
const bcrypt = require('bcrypt')
const {del} = require("express/lib/application");
const ServiceError = require("../exception/errorException");
const {HTTP_STATUS} = require("../constant/httpStatusConstant");

exports.checkNISNDosenExists = async nisn =>
    await dosenRepository.checkNISNDosenExists(nisn)

exports.checkEmailDosenExists = async email =>
    await dosenRepository.checkEmailDosenExists(email)

exports.getDosenByEmail = async email =>
    await dosenRepository.getDosenByEmail(email)

exports.getAllDosen = async () =>
    await dosenRepository.getAllDosen()

exports.getDosenById = async id =>
    await dosenRepository.getDosenById(id)

exports.addDosen = async data => {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, await bcrypt.genSalt())
    } else {
        delete data.password
    }
    await dosenRepository.addDosen(data)
}

exports.addMultipleDosen = async data => {
    const datas = []
    let i = 1
    for (const {password, nama_dosen, nomor_induk_dosen_nasional, nomor_induk_pegawai} of data) {
        if (!password) {
            throw new ServiceError(`password tidak terisi pada row ${i}`, HTTP_STATUS.BAD_REQUEST)
        }

        if (!nama_dosen) {
            throw new ServiceError(`nama_dosen tidak terisi pada row ${i}`, HTTP_STATUS.BAD_REQUEST)
        }

        if (!nomor_induk_dosen_nasional) {
            throw new ServiceError(`nomor_induk_dosen_nasional tidak terisi pada row ${i}`, HTTP_STATUS.BAD_REQUEST)
        }

        if (!nomor_induk_pegawai) {
            throw new ServiceError(`nomor_induk_pegawai tidak terisi pada row ${i}`, HTTP_STATUS.BAD_REQUEST)
        }

        datas.push({
            nama_dosen,
            nomor_induk_dosen_nasional,
            nomor_induk_pegawai,
            password: await bcrypt.hash(password, await bcrypt.genSalt())
        })
        i++
    }

    await dosenRepository.addBulkDosen(datas)
}

exports.updateDosen = async data => {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, await bcrypt.genSalt())
    }

    await dosenRepository.updateDosen(data.id, data)
}

exports.deleteDosen = async id => {
    await dosenRepository.deleteDosen(id)
}