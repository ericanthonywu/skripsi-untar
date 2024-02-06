const db = require("../config/database/connection")
const {checkExistTable} = require("../utils/dbUtil");

exports.register = async (username, password) => {
    await db("admin")
        .insert({
            username,
            password
        })
}

exports.checkAdminExists = async (username) =>
    await checkExistTable(db("admin").where({username}))

exports.findAdminByUsername = async (username) =>
    await db("admin").where({
        username
    }).first()