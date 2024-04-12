const penelitianRepository = require('../repository/penelitianRepository')
const moment = require("moment");
const fs = require("fs");
const path = require("node:path");
const _ = require("lodash");
const {del} = require("express/lib/application");

exports.getTotalPenelitian = async (dosen_id, search) =>
    (await penelitianRepository.getTotalPenelitian(dosen_id, search)).total || 0

exports.getTotalPenelitianSelesai = async () =>
    (await penelitianRepository.getTotalPenelitianSelesai()).total || 0

exports.getPenelitianAnalytic = async year => {
    const data = await penelitianRepository.getAnalyticPenelitian(year)

    return _.chain(data)
        .groupBy('year')
        .map((yearValue, yearKey) => _.chain(yearValue)
            .groupBy('month')
            .map((monthValue, monthKey) => {
                let obj = {
                    date: moment(monthKey, 'M').format('MMM') + " " + yearKey,
                    jumlah_penelitian_selesai: 0,
                    jumlah_penelitian_batal: 0,
                    jumlah_penelitian_sedang_berlanjut: 0
                };

                for (let item of monthValue) {
                    switch (item.status) {
                        case 'Selesai':
                            obj.jumlah_penelitian_selesai += Number(item.total);
                            break;
                        case 'Batal':
                            obj.jumlah_penelitian_batal += Number(item.total);
                            break;
                        case 'Sedang Berlanjut':
                            obj.jumlah_penelitian_sedang_berlanjut += Number(item.total);
                            break;
                    }
                }

                if (obj.jumlah_penelitian_batal === 0) {
                    delete obj.jumlah_penelitian_batal
                }

                if (obj.jumlah_penelitian_selesai === 0) {
                    delete obj.jumlah_penelitian_selesai
                }

                if (obj.jumlah_penelitian_sedang_berlanjut === 0) {
                    delete obj.jumlah_penelitian_sedang_berlanjut
                }

                return obj;
            })
            .value()
        )
        .flatten()
        .value();
}

exports.getBiayaPenelitianAnalytic = async year => {
    const data = await penelitianRepository.getBiayaPenelitian(year)

    const allMonths = Array.from({length: 12}, (_, i) => i + 1);

    return _.chain(data)
        .groupBy('year')
        .map((yearValue, yearKey) => {
            return _.map(allMonths, month => {
                const monthKey = String(month);
                const filteredData = yearValue.filter(item => item.month == monthKey);

                let obj = {
                    date: moment(monthKey, 'M').format('MMM') + " " + yearKey,
                    jumlah_penelitian_selesai: 0,
                    jumlah_penelitian_batal: 0,
                    jumlah_penelitian_sedang_berlanjut: 0
                };

                for (let item of filteredData) {
                    switch(item.status) {
                        case 'Selesai':
                            obj.jumlah_penelitian_selesai += Number(item.total);
                            break;
                        case 'Batal':
                            obj.jumlah_penelitian_batal += Number(item.total);
                            break;
                        case 'Sedang Berlanjut':
                            obj.jumlah_penelitian_sedang_berlanjut += Number(item.total);
                            break;
                    }
                }

                return obj;
            });
        })
        .flatten()
        .value();
}

exports.getTotalPenelitianBatal = async () =>
    (await penelitianRepository.getTotalPenelitianBatal()).total || 0

exports.getTotalPenelitianSedangBerlanjut = async () =>
    (await penelitianRepository.getTotalPenelitianSedangBerlanjut()).total || 0

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