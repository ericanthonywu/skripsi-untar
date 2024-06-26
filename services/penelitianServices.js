const penelitianRepository = require('../repository/penelitianRepository')
const kategoriPenelitianRepository = require('../repository/kategoriPenelitianRepository')
const dosenServices = require('../services/dosenServices')
const mahasiswaServices = require('../services/mahasiswaServices')
const fs = require("fs");
const path = require("node:path");
const _ = require("lodash");
const ServiceError = require("../exception/errorException");
const {HTTP_STATUS} = require("../constant/httpStatusConstant");
const penelitianNotificationScheduler = require('../schedule/penelitianNotificationScheduler')

exports.getTotalPenelitian = async (dosen_id, search) =>
    (await penelitianRepository.getTotalPenelitian(dosen_id, search)).total || 0

exports.getTotalPenelitianSelesai = async (dosen_id) =>
    (await penelitianRepository.getTotalPenelitianSelesai(dosen_id)).total || 0

exports.getPenelitianAnalytic = async (search, year, dosen_id, fakultas) => {
    const data = await penelitianRepository.getAnalyticPenelitian(search, year, dosen_id, fakultas)

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

                    for (const item of monthValue) {
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
                    obj.none = 0
                    return obj;
                }).value();
        })
        .flatten()
        .value();
}

exports.getBiayaPenelitianAnalytic = async (search, year, dosen_id, fakultas) => {
    const data = await penelitianRepository.getBiayaPenelitian(search, year, dosen_id, fakultas)

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

                    for (const item of monthValue) {
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

                    obj.none = 0

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

exports.getDokumenPenelitianByPenelitianId = async penelitian_id => {
    return penelitianRepository.getDokumenPenelitianByPenelitianId(penelitian_id)
}

exports.addPenelitianServices = async (data, anggota, file) => {
    // if (await penelitianRepository.checkJudulPenelitian(data.nama_proposal)) {
    //     throw new ServiceError('Judul proposal sudah pernah ditambahkan', HTTP_STATUS.BAD_REQUEST)
    // }
    const id = await penelitianRepository.addPenelitian(data, anggota, file);
    await penelitianNotificationScheduler.setNotif(id)
}

exports.addMultiplePenelitianServices = async (data, id_dosen) => {
    const errors = []
    let i = 1;
    const insertedData = []
    for (const {
        judul,
        periode,
        tahun,
        biaya_yang_diajukan,
        biaya_yang_disetujui,
        kategori_penelitian,
        subkategori_penelitian,
        ketua_dosen,
        anggota_dosen,
        anggota_mahasiswa
    } of data) {
        let objInserted = {
            biaya_yang_diajukan,
            biaya_yang_disetujui
        };

        // if (!judul) {
        //     errors.push(`judul kosong pada row ${i}`)
        // } else if (await penelitianRepository.checkJudulPenelitian(judul)) {
        //     errors.push(`judul "${judul}" sudah pernah ditambahkan pada row ${i}`)
        // } else {
            objInserted.nama_proposal = judul
        // }

        if (!tahun) {
            errors.push(`tahun kosong pada row ${i}`)
        } else {
            if (!periode) {
                errors.push(`periode kosong pada row ${i}`)
            } else {
                switch (parseInt(periode)) {
                    case 1:
                        objInserted.periode_awal = `${tahun}-02-01` // feb
                        objInserted.periode_akhir = `${tahun}-06-01` // juni
                        break
                    case 2:
                        objInserted.periode_awal = `${tahun}-08-01` // agustus
                        objInserted.periode_akhir = `${parseInt(tahun) + 1}-01-01` // januari
                        break
                    default:
                        errors.push(`periode ${periode} tidak tersedia pada row ${i}`)
                }
            }
        }


        if (!kategori_penelitian) {
            errors.push(`kategori_penelitian kosong pada row ${i}`)
        } else {
            const idKategori = await kategoriPenelitianRepository.getKategoriIdByNama(kategori_penelitian)
            if (!idKategori) {
                errors.push(`kategori_penelitian "${kategori_penelitian}" tidak tersedia pada row ${i}`)
            } else {
                const idSubkategori = await kategoriPenelitianRepository.getSubkategoriIdByNama(idKategori.id, subkategori_penelitian)
                if (!idSubkategori) {
                    errors.push(`subkategori_penelitian "${subkategori_penelitian}" dari kategori_penelitian ${kategori_penelitian} tidak tersedia pada row ${i}`)
                } else {
                    objInserted.id_subkategori_penelitian = idSubkategori.id
                }
            }
        }

        if (id_dosen) {
            const {nomor_induk_dosen_nasional} = await dosenServices.getDosenById(id_dosen)
            objInserted.ketua_dosen_penelitian = nomor_induk_dosen_nasional
        } else if (!ketua_dosen) {
            errors.push(`ketua_dosen kosong pada row ${i}`)
        } else if (!await dosenServices.checkNISNDosenExists(ketua_dosen)) {
            errors.push(`ketua_dosen dengan NIDN ${ketua_dosen} tidak tersedia pada row ${i}`)
        } else {
            objInserted.ketua_dosen_penelitian = ketua_dosen
        }

        if (anggota_dosen) {
            for (const NIDNDosen of anggota_dosen.split(',')) {
                if (!await dosenServices.checkNISNDosenExists(NIDNDosen)) {
                    errors.push(`NIDN Dosen ${NIDNDosen} tidak tersedia pada row ${i}`)
                }
            }
            objInserted.anggota_dosen = anggota_dosen.split(",")
        }


        if (anggota_mahasiswa) {
            for (const NIMMahassiwa of anggota_mahasiswa.split(',')) {
                if (!await mahasiswaServices.checkNIMMahasiswaExists(NIMMahassiwa)) {
                    errors.push(`NIM mahasiswa ${NIMMahassiwa} tidak tersedia pada row ${i}`)
                }
            }
            objInserted.anggota_mahasiswa = anggota_mahasiswa.split(",")
        }


        insertedData.push(objInserted)
        i++
    }

    if (errors.length > 0) {
        throw new ServiceError(errors.join("\n"), HTTP_STATUS.BAD_REQUEST)
    }

    for (const datas of insertedData) {
        const anggota = {
            list_dosen: datas.anggota_dosen || [],
            list_mahasiswa: datas.anggota_mahasiswa || []
        }
        delete datas.anggota_dosen
        delete datas.anggota_mahasiswa

        this.addPenelitianServices(datas, anggota, [])
    }
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

exports.getMaxAndMinYearServices = async (dosen_id) => {
    const maxYear = await penelitianRepository.getMaxYear(dosen_id);
    const minYear = await penelitianRepository.getMinYear(dosen_id);
    return {
        maxYear: maxYear.max,
        minYear: minYear.min
    }
}

exports.getMasterTipePenelitianDokumen = async () =>
    penelitianRepository.getMasterTipePenelitianDokumen()