const notificationRepository = require('../repository/notificationRepository')
const moment = require("moment");

exports.getNotifications = async (dosen_id, page = 1) => {
    let data = []
    if (dosen_id) {
        data = await notificationRepository.getNotificationsDosen(dosen_id, page)
    } else {
        data = await notificationRepository.getNotificationsAdmin(page)
    }

    let i = 0
    for (const datum of data) {
        data[i].created_at = moment(datum.created_at).format('DD MMM YYYY')
       i++
    }

    return {
        data,
        unread: await notificationRepository.getTotalUnreadNotifications(dosen_id)
    }
}

exports.addNotification = async (data) => {
    await notificationRepository.addNotifications(data)
}

exports.readNotification = async (id, dosen_id) => {
    await notificationRepository.readNotifications(id, dosen_id)
}
