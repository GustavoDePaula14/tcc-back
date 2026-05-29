/***********************************************
 * Objetivo: Arquivo responsável pela manipulação da camada controller de informação
 * Autor: Kauan Antunes
 * Data: 11/05/2026
 * Versão: 1.0
 ************************************************/

const usuario_familiaDAO = require("../../model/DAO/usuario_familia.js")
const mensagensDefault = require("../modulo/config_messages.js")
const validarDados = require("../modulo/validar_dados.js")
const validarAtributos = require("../modulo/validar_atributos.js")
const enviarEmail = require("../login/controller_login.js")
const usuarioDAO = require('../../model/DAO/usuario.js')
const listarUsuarioFamilia = async function () {
    try {
        let result = await usuario_familiaDAO.getAllUsersFamily()

        if (result) {
            return {
                status_code: mensagensDefault.SUCCESS_REQUEST.StatusCode,
                dados: result 
            }
        } else {
            return mensagensDefault.ERRO_NOT_FOUND
        }

    } catch (error) {
        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

const listarUsuarioFamiliaID = async function (id) {
    try {
        if (!validarAtributos.validarId(id))
            return mensagensDefault.ERRO_INVALID_ID

        let result = await usuario_familiaDAO.getUsersFamilyById(id)

        if (result) {
            return {
                status_code: mensagensDefault.SUCCESS_REQUEST.StatusCode,
                dados: result
            }
        } else {
            return mensagensDefault.ERRO_NOT_FOUND
        }

    } catch (error) {
        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

const criarUsuarioFamilia = async function (usuarioFamilia, contentType) {
    try {
        if (!validarAtributos.validarContentType(contentType))
            return mensagensDefault.ERRO_CONTENT_TYPE

        if (!validarDados.validarUsuarioFamilia(usuarioFamilia))
            return mensagensDefault.ERRO_REQUIRED_FIELDS

        let result = await usuario_familiaDAO.setInsertUsersFamily(usuarioFamilia)

        if (result) {
            return mensagensDefault.SUCCESS_CREATED_ITEM
        } else {
            return mensagensDefault.ERRO_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
      
        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}


const enviarEmailUsuarioFamiliaPorEmail = async function (usuarioFamilia, contentType) {
    try {

        if (!validarAtributos.validarContentType(contentType))
            return mensagensDefault.ERRO_CONTENT_TYPE

        if (!validarDados.validarUsuarioFamiliaPorEmail(usuarioFamilia))
            return mensagensDefault.ERRO_REQUIRED_FIELDS

        let remetente = await usuario_familiaDAO.getUserAdmFamilyById(usuarioFamilia.id_familia)
        // console.log(remetente)
        if(remetente != ""){
            usuarioFamilia.email.forEach(async usuario => {
                let emailValidado = await usuarioDAO.getUserByEmail(usuario)
                if(emailValidado == true){
                    let objUser = {
                        "email" : usuario,
                        "remetente" : remetente[0].nome_usuario,
                    }
                    let emailEnvidado = await enviarEmail.validarEntradoFamilia(objUser, contentType, usuarioFamilia.id_familia)
                }else{
                    return false
                }
            });
        }else{
            return mensagensDefault.ERRO_ADM_NOT_FOUND
        }
    } catch (error) {

        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}
const criarUsuarioFamiliaPorEmail = async function (usuarioFamilia, contentType) {
    try {
        console.log(usuarioFamilia)
        if (!validarAtributos.validarContentType(contentType))
            return mensagensDefault.ERRO_CONTENT_TYPE

        if (!validarDados.validarUsuarioFamiliaPorEmail(usuarioFamilia))
            return mensagensDefault.ERRO_REQUIRED_FIELDS

        let result = await usuario_familiaDAO
            .setInsertUsersFamilyByUserEmail(usuarioFamilia)
        console.log(result)

        if (result == null) {
            return {
                status: 404,
                message: "Usuário não encontrado."
            }
        }

        if (result == "duplicado") {
            return {
                status: 409,
                message: "Usuário já pertence à família."
            }
        }

        if (result) {
            return mensagensDefault.SUCCESS_CREATED_ITEM
        } else {
            return mensagensDefault.ERRO_INTERNAL_SERVER_MODEL
        }
                    
    } catch (error) {

        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}
const atualizarUsuarioFamilia = async function (usuarioFamilia, contentType, id) {
    try {
        if (!validarAtributos.validarId(id))
            return mensagensDefault.ERRO_INVALID_ID

        if (!validarAtributos.validarContentType(contentType))
            return mensagensDefault.ERRO_CONTENT_TYPE

        if (!validarDados.validarUsuarioFamilia(usuarioFamilia))
            return mensagensDefault.ERRO_REQUIRED_FIELDS

        let buscarId = await usuario_familiaDAO.getUsersFamilyById(id)

        if (!buscarId)
            return mensagensDefault.ERRO_NOT_FOUND


        usuarioFamilia.id_usuario_familia = parseInt(id)

        let result = await usuario_familiaDAO.setUpdateUsersFamily(usuarioFamilia)

        if (result) {
            return mensagensDefault.SUCCESS_UPDATED_ITEM
        } else {
            return mensagensDefault.ERRO_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirUsuarioFamilia = async function (id) {
    try {
        if (!validarAtributos.validarId(id))
            return mensagensDefault.ERRO_INVALID_ID

        let buscarId = await usuario_familiaDAO.getUsersFamilyById(id)

        if (!buscarId)
            return mensagensDefault.ERRO_NOT_FOUND

        let result = await usuario_familiaDAO.setDeleteUsersFamily(id)

        if (result) {
            return mensagensDefault.SUCCESS_DELETED_ITEM
        } else {
            return mensagensDefault.ERRO_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    listarUsuarioFamilia,
    listarUsuarioFamiliaID,
    criarUsuarioFamilia,
    criarUsuarioFamiliaPorEmail,
    atualizarUsuarioFamilia,
    excluirUsuarioFamilia,
    enviarEmailUsuarioFamiliaPorEmail
}