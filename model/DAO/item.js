/***********************************************
 * Objetivo: Arquivo de responsavel pela realização do CRUD no banco de dados SQL
 * Autor: Gustavo de Paula Silva
 * Data: 27/04/2026
 * Versão: 1.0
 ************************************************/
const knex = require("knex");
const knexConfig = require("../database_config/azure/knexfile.js");

const knexDatabase = knex(knexConfig.development);

//GET
const getAllItens = async function () {
    try {
        let sql = `select * from tb_item`
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
const getItenById = async function (id) {
    try {
        let sql = `select * from tb_item where id_item = ${id}`
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
const setInsertIten = async function (item) {
    try {
        let sql = `insert into tb_item(
                        nome_item,
                        quantidade,
                        valor_unitario,
                        comprado,
                        id_lista
                    )values(
                        '${item.nome_item}',
                        ${item.quantidade},
                        ${item.valor_unitario},
                        ${item.comprado},
                        ${item.id_lista}
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
const setUpdateIten = async function (item) {
    try {
        let sql = `update tb_item set
                        nome_item = '${item.nome_item}',
                        quantidade = ${item.quantidade},
                        valor_unitario = ${item.valor_unitario},
                        comprado = ${item.comprado},
                        id_lista= ${item.id_lista}
                    where id_item = ${item.id_item}`
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
const setDeleteIten = async function (id) {
    try {
        let = sql = `delete from tb_item where id_item = ${id}`
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
    getAllItens,
    getItenById,
    setInsertIten,
    setUpdateIten,
    setDeleteIten
}