const db = require("../config/database/connection")

exports.getNotificationsDosen = async (dosen_id, page) =>
    db('notification')
        .select('notification.id', 'message', 'penelitian_id', 'read_dosen as read', 'created_at')
        .where({dosen_id})
        .orderByRaw('read_dosen = false desc')
        .orderBy('created_at', 'desc')
        .limit(5)
        .offset(5 * (page - 1))

exports.getTotalUnreadNotifications = async (dosen_id) => {
    const query = db('notification')

    if (dosen_id) {
        query.where({dosen_id, read_dosen: false})
            .count('read_dosen as total')
    } else {
        query.where({read_admin: false})
            .count('read_admin as total')
    }

    return (await query.first()).total || 0
}

exports.readNotifications = async (notification_id, dosen_id) => {
    const query = db('notification')

    if (dosen_id) {
        query.where({notification_id: id})
            .update({read_dosen: true})
    } else {
        query.where({id: notification_id}).update({read_admin: true})
    }

    console.log(query.toQuery())
    return query
}

exports.getNotificationsAdmin = async (page) =>
    db('notification')
        .select('notification.id','message', 'penelitian_id', 'read_admin as read', 'created_at')
        .join('dosen', 'dosen.id', 'notification.dosen_id')
        .orderByRaw('read_admin = false desc')
        .orderBy('created_at', 'desc')
        .limit(5)
        .offset(5 * (page - 1))

exports.addNotifications = async (data) => {
    await db('notification')
        .insert(data)
}

