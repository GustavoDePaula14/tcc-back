/***********************************************
 * Objetivo: Arquivo de responsavel pela realização do CRUD no banco de dados SQL
 * Autor: Gustavo de Paula Silva
 * Data: 22/04/2026
 * Versão: 1.0
 ************************************************/
const knex = require("knex");
const knexConfig = require("../database_config/knexfile");

const knexDatabase = knex(knexConfig.development);

//GET 
const getAllUsers = async function(){
    try{
        let sql = "select * from tb_usuario"
        let result = await knexDatabase.raw(sql)
        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    }catch(error){
        console.log(error)
        return error
    }   
}
//GET por id
const getUserById = async function(id) {
    try{
        let sql = `select * from tb_usuario where id_usuario = ${id}`
        let result = await knexDatabase.raw(sql)
        console.log(result)
        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    }catch(error){
        console.log(error)
        return error
    }   
}
//POST 
const setInsertUser = async function(usuario) {
    try{
        let sql = `insert into tb_usuario(
                        nome,
                        cpf,
                        data_nascimento,
                        senha,
                        email
                    )values(
                        '${usuario.nome}',
                        '${usuario.cpf}',
                        '${usuario.data_nascimento}',
                        '${usuario.senha}',
                        '${usuario.email}'
                    )`
        let result = await knexDatabase.raw(sql)
        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    }catch(error){
        console.log(error)
        return error
    }   
}
//PUT
const setUpdateUser = async function(usuario) {
    try{
        let sql = `update tb_usuario set
                        nome = '${usuario.nome}',
                        cpf = '${usuario.cpf}',
                        data_nascimento = '${usuario.data_nascimento}',
                        senha = '${usuario.senha}',
                        email = '${usuario.email}'
                    where id_usuario = ${usuario.id_usuario}
                    )`
        let result = await knexDatabase.raw(sql)
        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    }catch(error){
        console.log(error)
        return error
    }   
}
//DELETE
const setDeleteUser = async function(id) {
    try{
        let sql = `delete from tb_usuario where id_usuario = ${id}`
        let result = await knexDatabase.raw(sql)
        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    }catch(error){
        console.log(error)
        return error
    }   
}
module.exports = {
    getAllUsers,
    getUserById,
    setInsertUser,
    setUpdateUser,
    setDeleteUser
}