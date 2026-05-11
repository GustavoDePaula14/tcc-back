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
const bcrypt = require('bcryptjs');

const validarLogin = async function(login, contentType) {
    let result = await loginDAO.getAutentication(login.email)    
    let senhaComparada = bcrypt.compareSync(login.senha, result[0][0].senha);    
    try {
        if(senhaComparada == true){
            if (result && result.length > 0) {
                mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_REQUEST.StatusCode
                mesagensDefault.HEADER.Status = senhaComparada
                mesagensDefault.HEADER.Response = result[0][0]
                return mesagensDefault.HEADER
            } else {
                return mesagensDefault.ERRO_NOT_FOUND
            }
        }else{
            return mesagensDefault.ERRO_INVALID_PASSWORD
        }
        return 
    } catch (error) {
        console.log(error)
        return mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }    
}

module.exports = {
    validarLogin
}