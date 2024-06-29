const schedule = require('node-schedule');
const moment = require("moment");
const notificationService = require("../services/notificationServices")
const penelitianService = require("../services/penelitianServices")

const generateCronFormat = months => {
    const threeMonthsFromNow = moment().add(months, 'months').startOf('day');

// Convert to schedule format
    const minute = threeMonthsFromNow.minute();
    const hour = threeMonthsFromNow.hour();
    const dayOfMonth = threeMonthsFromNow.date();
    const month = threeMonthsFromNow.month() + 1;

    return `${minute} ${hour} ${dayOfMonth} ${month} *`
}

const convertToTitleCase = (input) =>
    input.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

exports.setNotif = async (penelitian_id) => {
    const listFile = await penelitianService.getMasterTipePenelitianDokumen()

    for (const file of listFile) {
        let month = 0
        switch (file) {
            case 'surat_perjanjian_kerjasama':
                month = 1
                break
            case 'file_monev':
                month = 3
                break
            case 'file_laporan_kemajuan':
                month = 4
                break
            case 'file_laporan_akhir':
                month = 6
                break
            default:
                continue
        }

        schedule.scheduleJob(moment().add(month, 'months').toDate(), async () => {
            try {
                const dataPenelitian = await penelitianService.getPenelitianById(penelitian_id)
                if(!dataPenelitian.list_proposal[file]) {
                    await notificationService.addNotification({
                        message: `Jangan lupa upload ${convertToTitleCase(file)} untuk penelitian "${dataPenelitian.data.nama_proposal}"`,
                        penelitian_id,
                        dosen_id: dataPenelitian.data.id_ketua_dosen_penelitian,
                    })
                }
            } catch (e) {
                console.log('schedule failed to set, with error: ', e)
            }
        })
    }
}