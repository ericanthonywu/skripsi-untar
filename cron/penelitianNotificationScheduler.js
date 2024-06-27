const cron = require('node-cron')
const moment = require("moment");
const notificationService = require("../services/notificationServices")
const penelitianService = require("../services/penelitianServices")

const generateCronFormat = months => {
    const threeMonthsFromNow = moment().add(months, 'months').startOf('day');

// Convert to cron format
    const minute = threeMonthsFromNow.minute();
    const hour = threeMonthsFromNow.hour();
    const dayOfMonth = threeMonthsFromNow.date();
    const month = threeMonthsFromNow.month() + 1;

    return `${minute} ${hour} ${dayOfMonth} ${month} *`
}

const convertToTitleCase = (input) =>
    input.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

exports.setNotif = (tipe_file, id_penelitian) => {
    let month = 0
    switch (tipe_file) {
        case 'surat_perjanjian_kerjasama':
            month = 1
            break
        case 'file_monef':
            month = 3
            break
        case 'file_laporan_kemajuan':
            month = 4
            break
        case 'file_laporan_akhir':
            month = 6
            break
        default:
            return
    }
    cron.schedule(generateCronFormat(month), async () => {
        const dataPenelitian = await penelitianService.getPenelitianById(id_penelitian)

        await notificationService.addNotification({
            message: `Jangan lupa upload ${convertToTitleCase(tipe_file)} untuk penelitian "${dataPenelitian.data.nama_proposal}"`,
            id_penelitian,
            dosen_id: dataPenelitian.data.ketua_dosen_penelitian,
        })
    })
}