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
    try {
        // console.log(login.senha)
        let result = await loginDAO.getAutentication(login.email)           
        return bcrypt.compareSync(login.senha, result[0][0].senha);
    } catch (error) {
        return mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }    
}
module.exports = {
    validarLogin
}