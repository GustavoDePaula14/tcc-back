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


const criarUsuarioFamiliaPorEmail = async function (usuarioFamilia, contentType) {
    try {

        if (!validarAtributos.validarContentType(contentType))
            return mensagensDefault.ERRO_CONTENT_TYPE

        if (!validarDados.validarUsuarioFamiliaPorEmail(usuarioFamilia))
            return mensagensDefault.ERRO_REQUIRED_FIELDS

        let result = await usuario_familiaDAO
            .setInsertUsersFamilyByUserEmail(usuarioFamilia)

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
    excluirUsuarioFamilia
}