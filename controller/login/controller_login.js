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
const crypto = require("crypto")
const jwt = require('../../jwt/jwt_service.js')
const emails = require('../../azure-communication/enviarEmails.js')

const validarLogin = async function(login, contentType) {
    let result = await loginDAO.getAutentication(login.email)  
    let senhaComparada = bcrypt.compareSync(login.senha, result[0][0].senha); 
    console.log(senhaComparada)   
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
    } catch (error) {
        console.log(error)
        return mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }    
}
const criarCodigoSenha = function() {
    const codigo = crypto.randomInt(0, 1000000);
    const result = codigo.toString().padStart(6, '0');
    // console.log(result)
    return result
}

const validarTrocaSenha = async function (email, contentType) {
    let contentTypeValidado = validarAtributos.validarContentType(contentType)
    let code = criarCodigoSenha()
    let tokenCode = jwt.getTokenString(code)
    try {
        if(contentTypeValidado){
            let emailEnvidado = await emails.enviarNovaSenha(email, code)
            if(emailEnvidado == true){
                mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_REQUEST.StatusCode
                mesagensDefault.HEADER.Response = mesagensDefault.SUCCESS_REQUEST.message
                mesagensDefault.HEADER.code = tokenCode
                return mesagensDefault.HEADER
            }else{
                mesagensDefault.HEADER.StatusCode = mesagensDefault.ERRO_RELATION_TABLE.StatusCode
                mesagensDefault.HEADER.Response = mesagensDefault.ERRO_RELATION_TABLE.message

                return mesagensDefault.HEADER
            }
        }
    } catch (error) {
        console.log(error)
        return mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }  
}
const validarEntradoFamilia = async function (email, contentType, id) {
    let contentTypeValidado = validarAtributos.validarContentType(contentType)
    try {
        if(contentTypeValidado){
            let objToken = {"email": email.email, "id_familia":id}
            let token = jwt.getToken(objToken)
            let emailEnvidado = await emails.enviarLoginUsuarioFamila(email.email, email.remetente, token)
            if(emailEnvidado == true){
                mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_REQUEST.StatusCode
                mesagensDefault.HEADER.Response = mesagensDefault.SUCCESS_REQUEST.message
                return mesagensDefault.HEADER
            }else{
                mesagensDefault.HEADER.StatusCode = mesagensDefault.ERRO_RELATION_TABLE.StatusCode
                mesagensDefault.HEADER.Response = mesagensDefault.ERRO_RELATION_TABLE.message

                return mesagensDefault.HEADER
            }
        }
    } catch (error) {
        console.log(error)
        return mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }  
}
module.exports = {
    validarLogin,
    validarTrocaSenha,
    validarEntradoFamilia
}
