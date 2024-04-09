const db = require("../config/database/connection")
const {checkExistTable} = require("../utils/dbUtil");

exports.getAdminData = async () =>
    await db('admin').select('id', 'username')
        .where({role: 'viewer'})

exports.getAdminById = async id =>
    await db('admin')
        .first('id', 'username')
        .where({id})

exports.register = async (username, password, role = 'admin') => {
    await db("admin")
        .insert({
            username,
            password,
            role
        })
}

exports.updateAdminData = async (id, username, password) => {
    await db("admin")
        .update({
            username,
            password,
        }).where({id})
}

exports.deleteAdminData = async id =>
    await db('admin').where({id}).del()

exports.checkAdminExists = async (username) =>
    await checkExistTable(db("admin").where({username}))

exports.findAdminByUsername = async (username) =>
    await db("admin").where({
        username
    }).first()