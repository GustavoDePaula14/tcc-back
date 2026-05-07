/***********************************************
 * Objetivo: Arquivo de responsavel pela manipulação da camada model de usuarios
 * Autor: Gustavo de Paula Silva
 * Data: 24/04/2026
 * Versão: 1.0
 ************************************************/

const loginDAO = require("../../model/DAO/login.js")
const mesagensDefault = require("../modulo/config_messages.js")
const validarDados = require("../modulo/validar_dados.js")
const validarAtributos = require("../modulo/validar_atributos.js")

const validarLogin = async function(login, contentType) {
    try {
        let result = await loginDAO.getAutentication(login.email)           
        if(result[0][0].senha == login.senha){
            return true
        }else{
            return false
        }
    } catch (error) {
        return mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }    
}
module.exports = {
    validarLogin
}