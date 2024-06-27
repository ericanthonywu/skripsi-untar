const dosenRepository = require('../repository/dosenRepository')
const bcrypt = require('bcrypt')
const ServiceError = require("../exception/errorException");
const {HTTP_STATUS} = require("../constant/httpStatusConstant");

exports.getListProdiDosen = async () =>
    await dosenRepository.getListProdiDosen()

exports.checkNISNDosenExists = async nisn =>
    await dosenRepository.checkNISNDosenExists(nisn)

exports.findDosenByNameAndNIDN = async (search, exclude) =>
    await dosenRepository.findDosenByNameAndNIDN(search, exclude)

exports.checkNIPDosenExists = async nip =>
    await dosenRepository.checkNIPDosenExists(nip)

exports.checkEmailDosenExists = async email =>
    await dosenRepository.checkEmailDosenExists(email)

exports.getDosenByEmail = async email =>
    await dosenRepository.getDosenByEmail(email)

exports.getAllDosen = async () =>
    await dosenRepository.getAllDosen()

exports.getDosenById = async id =>
    await dosenRepository.getDosenById(id)

exports.addDosen = async data => {
    if (await dosenRepository.checkNISNDosenExists(data.nomor_induk_dosen_nasional)) {
        throw new ServiceError('NIDN Dosen sudah tersedia', HTTP_STATUS.BAD_REQUEST)
    }

    if (await dosenRepository.checkNIPDosenExists(data.nomor_induk_pegawai)) {
        throw new ServiceError(`Nomor Induk Pegawai sudah tersedia`, HTTP_STATUS.BAD_REQUEST)
    }

    if (await dosenRepository.checkEmailDosenExists(data.email)) {
        throw new ServiceError(`Email psudah tersedia`, HTTP_STATUS.BAD_REQUEST)
    }

    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt())
    await dosenRepository.addDosen(data)
}

exports.addMultipleDosen = async data => {
    let i = 1
    const errorList = []

    const nomorIndukDosenNasionalSet = new Set();
    const nomorIndukPegawaiSet = new Set();
    const emailSet = new Set();

    const dataProdi = await this.getListProdiDosen()

    for (const {password, nama_dosen, nomor_induk_dosen_nasional, nomor_induk_pegawai, email, fakultas} of data) {
        if (!password) {
            errorList.push(`password tidak terisi pada row ${i}`)
        } else {
            data[i].password = await bcrypt.hash(password, await bcrypt.genSalt())
        }

        if (!nama_dosen) {
            errorList.push(`nama_dosen tidak terisi pada row ${i}`)
        }

        if (!nomor_induk_dosen_nasional) {
            errorList.push(`nomor_induk_dosen_nasional tidak terisi pada row ${i}`)
        } else if (nomorIndukDosenNasionalSet.has(nomor_induk_dosen_nasional)) {
            errorList.push(`Duplicate nomor_induk_dosen_nasional pada row ${i}`)
        } else if (await dosenRepository.checkNISNDosenExists(nomor_induk_dosen_nasional)) {
            errorList.push(`Duplicate nomor_induk_dosen_nasional pada row ${i}`)
        } else {
            nomorIndukDosenNasionalSet.add(nomor_induk_dosen_nasional);
        }

        if (!nomor_induk_pegawai) {
            errorList.push(`nomor_induk_pegawai tidak terisi pada row ${i}`)
        } else if (nomorIndukPegawaiSet.has(nomor_induk_pegawai)) {
            errorList.push(`Duplicate nomor_induk_pegawai pada row ${i}`)
        } else if (await dosenRepository.checkNIPDosenExists(nomor_induk_pegawai)) {
            errorList.push(`Duplicate nomor_induk_pegawai pada row ${i}`)
        } else {
            nomorIndukPegawaiSet.add(nomor_induk_pegawai);
        }

        if (!email) {
            errorList.push(`email tidak terisi pada row ${i}`)
        } else if (emailSet.has(email)) {
            errorList.push(`Duplicate email pada row ${i}`)
        } else if (await dosenRepository.checkEmailDosenExists(email)) {
            errorList.push(`Duplicate email pada row ${i}`)
        } else {
            emailSet.add(nomor_induk_pegawai);
        }

        if (!fakultas) {
            errorList.push(`fakultas tidak terisi pada row ${i}`)
        } else if (!dataProdi.includes(fakultas)) {
            errorList.push(`fakultas tidak tersedia pada row ${i}`)
        }

        i++
    }

    if (errorList.length > 0) {
        throw new ServiceError(errorList.join("\n"), HTTP_STATUS.BAD_REQUEST)
    }
    await dosenRepository.addBulkDosen(data)
}

exports.updateDosen = async data => {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, await bcrypt.genSalt())
    } else {
        delete data.password
    }

    const dataDosen = await dosenRepository.getDosenById(data.id)

    if (data.nomor_induk_dosen_nasional) {
        if (dataDosen.nomor_induk_dosen_nasional !== data.nomor_induk_dosen_nasional) {
            if (await dosenRepository.checkNISNDosenExists(data.nomor_induk_dosen_nasional)) {
                throw new ServiceError('NIDN Dosen sudah tersedia', HTTP_STATUS.BAD_REQUEST)
            }
        }
    }

    if (data.nomor_induk_pegawai) {
        if (dataDosen.nomor_induk_pegawai !== data.nomor_induk_pegawai) {
            if (await dosenRepository.checkNIPDosenExists(data.nomor_induk_pegawai)) {
                throw new ServiceError(`Nomor Induk Pegawai sudah tersedia`, HTTP_STATUS.BAD_REQUEST)
            }
        }
    }

    if (data.email) {
        if (dataDosen.email !== data.email) {
            if (await dosenRepository.checkEmailDosenExists(data.email)) {
                throw new ServiceError(`Email psudah tersedia`, HTTP_STATUS.BAD_REQUEST)
            }
        }
    }

    await dosenRepository.updateDosen(data.id, data)
}

exports.deleteDosen = async id => {
    await dosenRepository.deleteDosen(id)
}