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
        let sqlUsuarios = `SELECT
                f.id_familia,
                f.nome AS nome_familia,
                u.id_usuario,
                u.nome AS nome_usuario,
                u.email,
                uf.is_admin
            FROM tb_usuario_familia uf
            INNER JOIN tb_usuario u
                ON u.id_usuario = uf.id_usuario
            INNER JOIN tb_familia f
                ON f.id_familia = uf.id_familia
            WHERE f.id_familia = ?`
            
        let sqlListas = `SELECT * FROM tb_lista WHERE id_familia = ?`
        let sqlItem = `SELECT * FROM tb_item WHERE id_lista = ?`

        let listas = await knexDatabase.raw(sqlListas, [idFamilia])
        // console.log(listas)
        let usuarios = await knexDatabase.raw(sqlUsuarios, [idFamilia])
        // console.log(usuarios)
        let items = await knexDatabase.raw(sqlItem, [listas[0][0].id_lista])
        // console.log(items)
        return {
            usuarios: usuarios[0],
            listas: listas[0],
            items: items[0]
        }

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