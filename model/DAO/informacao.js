/***********************************************
 * Objetivo: Arquivo de responsavel pela realização do CRUD no banco de dados SQL
 * Autor: Gustavo de Paula Silva
 * Data: 27/04/2026
 * Versão: 1.0
 ************************************************/
const knex = require("knex");
const knexConfig = require("../database_config/knexfile");

const knexDatabase = knex(knexConfig.development);

//GET 
const getAllInformations = async function() {
    try {
        let sql = `select * from tb_informacao`
        let result = await knexDatabase.raw(sql)

        if(Array.isArray(result)){
            return result
        }else{
            return false
        } 
    } catch (error) {
        return error
    }
}
//GET por id
const getInformationById = async function(id) {
    try {
        let sql = `select * from tb_informacao where id_info = ${id}`
        let result = await knexDatabase.raw(sql)

        if(Array.isArray(result)){
            return result
        }else{
            return false
        } 
    } catch (error) {
        return error
    }
}
//POST
const setInsertInformation = async function(informacao) {
    try {
        let sql = `insert into tb_informacao(
                        titulo,
                        descricao
                    )values(
                        '${informacao.titulo}',
                        '${informacao.descricao}'
                    )`
        let result = await knexDatabase.raw(sql)
        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
        return error
    }
}
//PUT
const setUpdateInformation = async function(informacao) {
    try {
        let sql = `update tb_informacao set
                        titulo = '${informacao.titulo}',
                        descricao = '${informacao.descricao}'
                    where id_info = ${informacao.id}
                    )`
        let result = await knexDatabase.raw(sql)
        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
        return error
    }
}
//DELETE
const setDeleteInformation = async function(id) {
    try {
        let = sql = `delete from tb_informacao where id_info = ${id}`
        let result = await knexDatabase.raw(sql)
        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
        return error
    }
}
module.exports = {
    getAllInformations,
    getInformationById,
    setInsertInformation,
    setUpdateInformation,
    setDeleteInformation
}