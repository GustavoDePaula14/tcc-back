/***********************************************
 * Objetivo: Arquivo de responsavel pela realização do CRUD no banco de dados SQL
 * Autor: Gustavo de Paula Silva
 * Data: 27/04/2026
 * Versão: 1.0
 ************************************************/
const knex = require("knex");
const knexConfig = require("../database_config/local/knexfile.js");

const knexDatabase = knex(knexConfig.development);

//GET
const getAllLists = async function () {
    try {
        let sql = `select * from tb_lista`
        let result = await knexDatabase.raw(sql)

        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return error
    }
}
//GET por id
const getListById = async function (id) {
    try {
        let sql = `select * from tb_lista where id_lista = ${id}`
        let result = await knexDatabase.raw(sql)

        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return error
    }
}
//POST
const setInsertList = async function (lista) {
    try {
        let sql = `insert into tb_lista(
                        id_familia,
                        id_usuario,
                        nome
                    )values(
                        ${lista.id_familia},
                        ${lista.id_usuario},
                        '${lista.nome}'
                    )`
        let result = await knexDatabase.raw(sql)
        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return error
    }
}
//PUT
const setUpdateList = async function (lista) {
    try {
        let sql = `update tb_lista set
                        id_familia = ${lista.id_familia},
                        id_usuario = ${lista.id_usuario}
                        nome = '${lista.nome}'
                    where id_lista = ${lista.id_lista}`
        let result = await knexDatabase.raw(sql)
        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return error
    }
}
//DELETE
const setDeleteList = async function (id) {
    try {
        let = sql = `delete from tb_lista where id_lista = ${id}`
        let result = await knexDatabase.raw(sql)
        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return error
    }
}
module.exports = {
    getAllLists,
    getListById,
    setDeleteList,
    setUpdateList,
    setInsertList
}