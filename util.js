const db = require("./config/database/connection")

exports.checkExistsTable = async query => {
    const data = await db.first(db.raw(`exists(${query.select(db.raw('1')).toQuery()})`));
    return data.exists;
}