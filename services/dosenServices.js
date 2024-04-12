const dosenRepository = require('../repository/dosenRepository')
const bcrypt = require('bcrypt')
const {del} = require("express/lib/application");

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
    for (const currentData of data) {
        datas.push({
            ...currentData,
            password: await bcrypt.hash(currentData.password, await bcrypt.genSalt())
        })
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