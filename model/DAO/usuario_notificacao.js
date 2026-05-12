/***********************************************
 * Objetivo: Arquivo de responsavel pela realização do CRUD no banco de dados SQL
 * Autor: Kauan Antunes
 * Data: 11/05/2026
 * Versão: 1.0
 ************************************************/
const knex = require("knex");
const knexConfig = require("../database_config/knexfile");

const knexDatabase = knex(knexConfig.development);


// GET 
const getAllUsersNotification = async function () {
    try {
        let sql = `select * from tb_usuario_notificacao`
        let result = await knexDatabase.raw(sql)
        
        return result[0] 

    } catch (error) {
        return false
    }
}

// GET BY ID
const getUsersNotificationById = async function (id) {
    try {
        let sql = `select * from tb_usuario_notificacao where id_usuario_notificacao = ?`
        let result = await knexDatabase.raw(sql, [id])

        return result[0]
    } catch (error) {
        return false
    }
}

// POST
const setInsertUsersNotification = async function (usuarioNotificacao) {
    try {
        let sql = `insert into tb_usuario_notificacao (id_usuario, id_notificacao) values (?, ?)`
                    console.log(sql)
        let result = await knexDatabase.raw(sql, [
            usuarioNotificacao.id_usuario,
            usuarioNotificacao.id_notificacao
        ])

        return !!result
    } catch (error) {
        return false
    }
}

// PUT
const setUpdateUsersNotification = async function (usuarioNotificacao) {
    try {
        let sql = `
            update tb_usuario_notificacao set
                id_usuario = ?,
                id_notificacao = ?
            where id_usuario_notificacao = ?
        `
        console.log(sql)
        let result = await knexDatabase.raw(sql, [
            usuarioNotificacao.id_usuario,
            usuarioNotificacao.id_notificacao,
            usuarioNotificacao.id_usuario_notificacao
        ])

        return !!result
    } catch (error) {
        return false
    }
}

// DELETE
const setDeleteUsersNotification = async function (id) {
    try {
        let sql = `delete from tb_usuario_notificacao where id_usuario_notificacao = ?`
        let result = await knexDatabase.raw(sql, [id])

        return !!result
    } catch (error) {
        return false
    }
}

module.exports = {
    getAllUsersNotification,
    getUsersNotificationById,
    setInsertUsersNotification,
    setUpdateUsersNotification,
    setDeleteUsersNotification,
}