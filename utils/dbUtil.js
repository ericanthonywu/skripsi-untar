const db = require("../config/database/connection");
/**
 * Global check exist
 *
 * @param query {Knex.QueryBuilder<> | Knex.QueryInterface<>}
 * @return {Promise<boolean> | Promise<error>}
 */
exports.checkExistTable = async query => {
    const check = await db.raw(`select exists(${query.first(1).toQuery()}) as "check"`)
    return check.rows[0].check
}