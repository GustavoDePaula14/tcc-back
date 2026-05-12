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
const getAllUsersFamily = async function () {
    try {
        let sql = `select * from tb_usuario_familia`
        let result = await knexDatabase.raw(sql)

        return result[0] 

    } catch (error) {
        return false
    }
}

// GET BY ID
const getUsersFamilyById = async function (id) {
    try {
        let sql = `select * from tb_usuario_familia where id_usuario_familia = ?`
        let result = await knexDatabase.raw(sql, [id])

        return result[0]
    } catch (error) {
        return false
    }
}

// POST
const setInsertUsersFamily = async function (usuarioFamilia) {
    try {
        let sql = `insert into tb_usuario_familia (id_usuario, id_familia) values (?, ?)`
                    console.log(sql)
        let result = await knexDatabase.raw(sql, [
            usuarioFamilia.id_usuario,
            usuarioFamilia.id_familia
        ])

        return !!result
    } catch (error) {
        return false
    }
}

// PUT
const setUpdateUsersFamily = async function (usuarioFamilia) {
    try {
        let sql = `
            update tb_usuario_familia set
                id_usuario = ?,
                id_familia = ?
            where id_usuario_familia = ?
        `
        console.log(sql)
        let result = await knexDatabase.raw(sql, [
            usuarioFamilia.id_usuario,
            usuarioFamilia.id_familia,
            usuarioFamilia.id_usuario_familia
        ])

        return !!result
    } catch (error) {
        return false
    }
}

// DELETE
const setDeleteUsersFamily = async function (id) {
    try {
        let sql = `delete from tb_usuario_familia where id_usuario_familia = ?`
        let result = await knexDatabase.raw(sql, [id])

        return !!result
    } catch (error) {
        return false
    }
}

module.exports = {
    getAllUsersFamily,
    getUsersFamilyById,
    setInsertUsersFamily,
    setUpdateUsersFamily,
    setDeleteUsersFamily,
}