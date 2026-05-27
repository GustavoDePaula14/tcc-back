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
const getAllItensListsById= async function(idFamilia) {
    try {
        let sql = `
            SELECT
                f.id_familia,
                f.nome AS nome_familia,

                u.id_usuario,
                u.nome AS nome_usuario,
                u.email,
                uf.is_admin,

                l.id_lista,
                l.nome AS nome_lista,

                i.id_item,
                i.nome_item,
                i.quantidade,
                i.valor_unitario,
                i.valor_total,
                i.comprado

            FROM tb_familia f

            INNER JOIN tb_usuario_familia uf
                ON uf.id_familia = f.id_familia

            INNER JOIN tb_usuario u
                ON u.id_usuario = uf.id_usuario

            LEFT JOIN tb_lista l
                ON l.id_familia = f.id_familia
                AND l.id_usuario = u.id_usuario

            LEFT JOIN tb_item i
                ON i.id_lista = l.id_lista

            WHERE f.id_familia = ?

            ORDER BY u.id_usuario, l.id_lista, i.id_item
        `

        let result = await knexDatabase.raw(sql, [idFamilia])

        return result[0]

    } catch (error) {
        console.log(error)
        return false
    }
}
// getAllItensListsById(1)
//GET por id
const getListById = async function (id) {
    try {
        let sqlLista = `select * from tb_lista where id_lista = ?`
        let sqlItem = `select * from tb_item where id_lista = ?`


        let listas = await knexDatabase.raw(sqlLista, [id])
        let items = await knexDatabase.raw(sqlItem, [id])
        // console.log(items)
        return {
            listas: listas[0],
            items: items[0]
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
                        id_usuario = ${lista.id_usuario},
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
    setInsertList,
    getAllItensListsById
}