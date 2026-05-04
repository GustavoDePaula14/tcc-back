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
const getAllAddresses = async function() {
    try {
        let sql = `select * from tb_endereco`
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
const getAddressById = async function(id) {
    try {
        let sql = `select * from tb_endereco where id_endereco = ${id}`
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
const setInsertAddress = async function(endereco) {
    try {
        let sql = `insert into tb_endereco(
                        cep,
                        estado,
                        cidade,
                        bairro,
                        logradouro,
                        complemento,
                        numero
                    )values(
                        '${endereco.cep}',
                        '${endereco.estado}',
                        '${endereco.cidade}',
                        '${endereco.bairro}',
                        '${endereco.logradouro}',
                        '${endereco.complemento}',
                        ${endereco.numero}
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
const setUpdateAddress = async function(endereco) {
    try {
        let sql = `update tb_endereco set
                        cep = '${endereco.cep}',
                        estado = '${endereco.estado}',
                        cidade = '${endereco.cidade}',
                        bairro = '${endereco.bairro}',
                        logradouro = '${endereco.logradouro}',
                        complemento = '${endereco.complemento}',
                        numero = ${endereco.numero}
                    where id_endereco = ${endereco.id}
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
const setDeleteAddress = async function(id) {
    try {
        let = sql = `delete from tb_endereco where id_endereco = ${id}`
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
module.exports ={
    getAllAddresses,
    getAddressById,
    setUpdateAddress,
    setInsertAddress,
    setDeleteAddress
}