const penelitianRepository = require('../repository/penelitianRepository')
const moment = require("moment");
const fs = require("fs");
const path = require("node:path");
const _ = require("lodash");
const ServiceError = require("../exception/errorException");
const {HTTP_STATUS} = require("../constant/httpStatusConstant");

exports.getTotalPenelitian = async (dosen_id, search) =>
    (await penelitianRepository.getTotalPenelitian(dosen_id, search)).total || 0

exports.getTotalPenelitianSelesai = async (dosen_id) =>
    (await penelitianRepository.getTotalPenelitianSelesai(dosen_id)).total || 0

exports.getPenelitianAnalytic = async (year, dosen_id) => {
    const data = await penelitianRepository.getAnalyticPenelitian(year, dosen_id)

    return _.chain(data)
        .groupBy('year')
        .map((yearValue, yearKey) => {
            return _.chain(yearValue)
                .groupBy('month')
                .map((monthValue, monthKey) => {
                    let obj = {
                        jumlah_penelitian_selesai: 0,
                        jumlah_penelitian_yang_disetujui: 0
                    };

                    for (let item of monthValue) {
                        switch (item.status) {
                            case 'Selesai':
                                obj.jumlah_penelitian_selesai += Number(item.total);
                                break;
                            case 'Disetujui':
                                obj.jumlah_penelitian_yang_disetujui += Number(item.total);
                                break;
                        }
                    }

                    switch (monthKey) {
                        case '2':
                            obj.date = `Periode 1 (Februari ${yearKey} - Juni ${yearKey})`;
                            break;
                        case '8':
                            obj.date = `Periode 2 (Agustus ${yearKey} - Januari ${parseInt(yearKey) + 1})`;
                            break;
                        default:
                            obj.date = `${monthKey} ${yearKey}`
                    }

                    ['jumlah_penelitian_selesai', 'jumlah_penelitian_yang_disetujui'].forEach(key => {
                        if (obj[key] === 0) {
                            delete obj[key];
                        }
                    });

                    return obj;
                }).value();
        })
        .flatten()
        .value();
}

exports.getBiayaPenelitianAnalytic = async (year, dosen_id) => {
    const data = await penelitianRepository.getBiayaPenelitian(year, dosen_id)

    return _.chain(data)
        .groupBy('year')
        .map((yearValue, yearKey) => {
            return _.chain(yearValue)
                .groupBy('month')
                .map((monthValue, monthKey) => {
                    let obj = {
                        jumlah_penelitian_selesai: 0,
                        jumlah_penelitian_yang_disetujui: 0,
                    };

                    for (let item of monthValue) {
                        switch (item.status) {
                            case 'Selesai':
                                obj.jumlah_penelitian_selesai += Number(item.total);
                                break;
                            case 'Disetujui':
                                obj.jumlah_penelitian_yang_disetujui += Number(item.total);
                                break;
                        }
                    }

                    switch (monthKey) {
                        case '2':
                            obj.date = `Periode 1 (Februari ${yearKey} - Juni ${yearKey})`;
                            break;
                        case '8':
                            obj.date = `Periode 2 (Agustus ${yearKey} - Januari ${parseInt(yearKey) + 1})`;
                            break;
                        default:
                            obj.date = `${monthKey} ${yearKey}`
                    }

                    ['jumlah_penelitian_selesai', 'jumlah_penelitian_yang_disetujui'].forEach(key => {
                        if (obj[key] === 0) {
                            delete obj[key];
                        }
                    });

                    return obj;
                }).value();
        })
        .flatten()
        .value();
}

exports.getTotalPenelitianBatal = async (dosen_id) =>
    (await penelitianRepository.getTotalPenelitianBatal(dosen_id)).total || 0

exports.getTotalPenelitianSedangBerlangsung = async (dosen_id) =>
    (await penelitianRepository.getTotalPenelitianSedangBerlangsung(dosen_id)).total || 0

exports.getPenelitianById = async id => {
    const data = await penelitianRepository.getPenelitianById(id)
    const list_dosen = await penelitianRepository.getAnggotaDosenByPenelitianId(id)
    const list_mahasiswa = await penelitianRepository.getAnggotaMahasiswaByPenelitianId(id)
    const list_proposal = await penelitianRepository.getDokumenPenelitianByPenelitianId(id)

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
    if (await penelitianRepository.checkJudulPenelitian(data.nama_proposal)) {
        throw new ServiceError('Judul proposal sudah pernah di tambahkan', HTTP_STATUS.BAD_REQUEST)
    }
    await penelitianRepository.addPenelitian(data, anggota, file)
}

exports.ubahPenelitianServices = async (data, anggota, file) => {
    const {nama_proposal} = await penelitianRepository.getJudulPenelitianById(data.id)
    if (nama_proposal !== data.nama_proposal) {
        if (await penelitianRepository.checkJudulPenelitian(data.nama_proposal)) {
            throw new ServiceError('Judul proposal sudah pernah di tambahkan', HTTP_STATUS.BAD_REQUEST)
        }
    }
    await penelitianRepository.ubahPenelitian(data.id, data, anggota, file)
}

exports.cancelPenelitianServices = async id => {
    await penelitianRepository.cancelPenelitian(id)
}

exports.deletePenelitianServices = async id => {
    const listFile = await penelitianRepository.getProposalPenelitian(id)
    await penelitianRepository.deletePenelitian(id)
    for (const file of listFile) {
        fs.unlinkSync(path.join(__dirname, `../`, file))
    }
}

exports.getMaxAndMinYearServices = async () => {
    const maxYear = await penelitianRepository.getMaxYear();
    const minYear = await penelitianRepository.getMinYear();
    return {
        maxYear: maxYear.max,
        minYear: minYear.min
    }
}