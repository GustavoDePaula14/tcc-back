/***********************************************
 * Objetivo: Arquivo responsável pela manipulação da camada controller de informação
 * Autor: Kauan Antunes
 * Data: 07/05/2026
 * Versão: 1.2
 ************************************************/

const usuario_informacaoDAO = require("../../model/DAO/usuario_informacao.js")
const mensagensDefault = require("../modulo/config_messages.js")
const validarDados = require("../modulo/validar_dados.js")
const validarAtributos = require("../modulo/validar_atributos.js")

const listarUsuarioInformacao = async function () {
    try {
        let result = await usuario_informacaoDAO.getAllUsersInformation()

        if (result && result.length > 0) {
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

const listarUsuarioInformacaoID = async function (id) {
    try {
        if (!validarAtributos.validarId(id))
            return mensagensDefault.ERRO_INVALID_ID

        let result = await usuario_informacaoDAO.getUsersInformationById(id)
        console.log(result)

        if (result && result.length > 0) {
            return {
                status_code: mensagensDefault.SUCCESS_REQUEST.StatusCode,
                dados: result[0]
            }
        } else {
            return mensagensDefault.ERRO_NOT_FOUND
        }

    } catch (error) {
        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

const criarUsuarioInformacao = async function (usuarioInformacao, contentType) {
    try {
        if (!validarAtributos.validarContentType(contentType))
            return mensagensDefault.ERRO_CONTENT_TYPE

        if (!validarDados.validarUsuarioInformacao(usuarioInformacao))
            return mensagensDefault.ERRO_REQUIRED_FIELDS

        let result = await usuario_informacaoDAO.setInsertUsersInformation(usuarioInformacao)

        if (result) {
            return mensagensDefault.SUCCESS_CREATED_ITEM
        } else {
            return mensagensDefault.ERRO_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
      
        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarUsuarioInformacao = async function (usuarioInformacao, contentType, id) {
    try {
        if (!validarAtributos.validarId(id))
            return mensagensDefault.ERRO_INVALID_ID

        if (!validarAtributos.validarContentType(contentType))
            return mensagensDefault.ERRO_CONTENT_TYPE

        if (!validarDados.validarUsuarioInformacao(usuarioInformacao))
            return mensagensDefault.ERRO_REQUIRED_FIELDS

        let buscarId = await usuario_informacaoDAO.getUsersInformationById(id)

        if (!buscarId || buscarId.length === 0)
            return mensagensDefault.ERRO_NOT_FOUND

        usuarioInformacao.id_usuario_informacao = parseInt(id)

        let result = await usuario_informacaoDAO.setUpdateUsersInformation(usuarioInformacao)

        if (result) {
            return mensagensDefault.SUCCESS_UPDATED_ITEM
        } else {
            return mensagensDefault.ERRO_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirUsuarioInformacao = async function (id) {
    try {
        if (!validarAtributos.validarId(id))
            return mensagensDefault.ERRO_INVALID_ID

        let buscarId = await usuario_informacaoDAO.getUsersInformationById(id)

        if (!buscarId || buscarId.length === 0)
            return mensagensDefault.ERRO_NOT_FOUND

        let result = await usuario_informacaoDAO.setDeleteUsersInformation(id)

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
    listarUsuarioInformacao,
    listarUsuarioInformacaoID,
    criarUsuarioInformacao,
    atualizarUsuarioInformacao,
    excluirUsuarioInformacao
}