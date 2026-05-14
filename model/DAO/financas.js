/***********************************************
 * Objetivo: Arquivo de responsavel pela realização do CRUD no banco de dados SQL
 * Autor: Kauan Antunes
 * Data: 06/05/2026
 * Versão: 1.0
 ************************************************/
const knex = require("knex");
const knexConfig = require("../database_config/knexfile");

const knexDatabase = knex(knexConfig.development);

//GET 
const getAllFinances = async function() {
    try {
        let sql = `select * from tb_financas`
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
const getFinanceById = async function(id) {
    try {
        let sql = `select * from tb_financas where id_financas = ${id}`
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

//GET Financas por dia
const getDailyFinances = async function(idFamilia) {
    try {
        let sql = `select * from vw_financas_diarias WHERE id_familia = ${idFamilia} ORDER BY ano, mes, dia`
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

//GET Financas por semana
const getWeekFinances = async function(idFamilia) {
    try {
        let sql = `select * from vw_financas_semanais WHERE id_familia = ${idFamilia} ORDER BY ano, mes, semana`
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

//GET Financas por mes
const getMonthFinances = async function(idFamilia) {
    try {
        let sql = `select * from vw_financas_mensais WHERE id_familia = ${idFamilia} ORDER BY ano, mes`
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

//GET Financas por mes
const getYearFinances = async function(idFamilia) {
    try {
        let sql = `select * from vw_financas_anuais WHERE id_familia = ${idFamilia} ORDER BY ano`
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
const setInsertFinance = async function(financas) {
    try {
        let sql = `insert into tb_financas(
                        id_familia,
                        tipo,
                        descricao,
                        valor,
                        icone
                    )values(
                        ${financas.id_familia},
                        '${financas.tipo}',
                        '${financas.descricao}',
                        ${financas.valor},
                        '${financas.icone}'
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
const setUpdateFinance = async function(financas) {
    try {
        let sql = `update tb_financas set
                        tipo = '${financas.tipo}',
                        descricao = '${financas.descricao}',
                        valor = ${financas.valor},
                        icone = '${financas.icone}'
                    where id_financas = ${financas.id_financas}`
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
const setDeleteFinance = async function(id) {
    try {
        let = sql = `delete from tb_financas where id_financas = ${id}`
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
    getAllFinances,
    getFinanceById,
    getDailyFinances,
    getWeekFinances,
    getMonthFinances,
    getYearFinances,
    setInsertFinance,
    setUpdateFinance,
    setDeleteFinance
}