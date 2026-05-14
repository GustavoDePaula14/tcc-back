/***********************************************
 * Objetivo: Arquivo de responsavel pela realização do CRUD no banco de dados SQL
 * Autor: Kauan Antunes
 * Data: 07/05/2026
 * Versão: 1.0
 ************************************************/
const knex = require("knex");
const knexConfig = require("../database_config/knexfile");

const knexDatabase = knex(knexConfig.development);


// GET 
const getAllUsersInformation = async function () {
    try {
        let sql = `SELECT
                        ui.id_usuario_informacao,
                        u.id_usuario,
                        u.nome,
                        i.id_info,
                        i.descricao
                    FROM tb_usuario_informacao ui

                    INNER JOIN tb_usuario u
                        ON u.id_usuario = ui.id_usuario
                    INNER JOIN tb_informacao i
                        ON i.id_info = ui.id_info`   
        let result = await knexDatabase.raw(sql)

        return result[0] 

    } catch (error) {
        return false
    }
}

// GET BY ID
const getUsersInformationById = async function (id) {
    try {
        let sql = `SELECT
                        ui.id_usuario_informacao,
                        u.id_usuario,
                        u.nome,
                        i.id_info,
                        i.descricao
                    FROM tb_usuario_informacao ui
                    
                    INNER JOIN tb_usuario u
                        ON u.id_usuario = ui.id_usuario
                    INNER JOIN tb_informacao i
                        ON i.id_info = ui.id_info
        
                    WHERE ui.id_usuario_informacao = ?`
        let result = await knexDatabase.raw(sql, [id])

        return result[0]
    } catch (error) {
        return false
    }
}

// POST
const setInsertUsersInformation = async function (usuarioInformacao) {
    try {
        let sql = `insert into tb_usuario_informacao (id_usuario, id_info) values (?, ?)`
                    console.log(sql)
        let result = await knexDatabase.raw(sql, [
            usuarioInformacao.id_usuario,
            usuarioInformacao.id_info
        ])

        return !!result
    } catch (error) {
        return false
    }
}

// PUT
const setUpdateUsersInformation = async function (usuarioInformacao) {
    try {
        let sql = `
            update tb_usuario_informacao set
                id_usuario = ?,
                id_info = ?
            where id_usuario_informacao = ?
        `
        let result = await knexDatabase.raw(sql, [
            usuarioInformacao.id_usuario,
            usuarioInformacao.id_info,
            usuarioInformacao.id_usuario_informacao
        ])

        return !!result
    } catch (error) {
        return false
    }
}

// DELETE
const setDeleteUsersInformation = async function (id) {
    try {
        let sql = `delete from tb_usuario_informacao where id_usuario_informacao = ?`
        let result = await knexDatabase.raw(sql, [id])

        return !!result
    } catch (error) {
        return false
    }
}

module.exports = {
    getAllUsersInformation,
    getUsersInformationById,
    setInsertUsersInformation,
    setUpdateUsersInformation,
    setDeleteUsersInformation,
}