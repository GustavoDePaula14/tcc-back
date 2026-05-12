/***********************************************
 * Objetivo: Arquivo responsável pela manipulação da camada controller de informação
 * Autor: Kauan Antunes
 * Data: 11/05/2026
 * Versão: 1.0
 ************************************************/

const usuario_notificacaoDAO = require("../../model/DAO/usuario_notificacao.js")
const mensagensDefault = require("../modulo/config_messages.js")
const validarDados = require("../modulo/validar_dados.js")
const validarAtributos = require("../modulo/validar_atributos.js")

const listarUsuarioNotificacao = async function () {
    try {
        let result = await usuario_notificacaoDAO.getAllUsersNotification()

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

const listarUsuarioNotificacaoID = async function (id) {
    try {
        if (!validarAtributos.validarId(id))
            return mensagensDefault.ERRO_INVALID_ID

        let result = await usuario_notificacaoDAO.getUsersNotificationById(id)

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

const criarUsuarioNotificacao = async function (usuarioNotificacao, contentType) {
    try {
        if (!validarAtributos.validarContentType(contentType))
            return mensagensDefault.ERRO_CONTENT_TYPE

        if (!validarDados.validarUsuarioNotificacao(usuarioNotificacao))
            return mensagensDefault.ERRO_REQUIRED_FIELDS

        let result = await usuario_notificacaoDAO.setInsertUsersNotification(usuarioNotificacao)

        if (result) {
            return mensagensDefault.SUCCESS_CREATED_ITEM
        } else {
            return mensagensDefault.ERRO_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
      
        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarUsuarioNotificacao = async function (usuarioNotificacao, contentType, id) {
    try {
        if (!validarAtributos.validarId(id))
            return mensagensDefault.ERRO_INVALID_ID

        if (!validarAtributos.validarContentType(contentType))
            return mensagensDefault.ERRO_CONTENT_TYPE

        if (!validarDados.validarUsuarioNotificacao(usuarioNotificacao))
            return mensagensDefault.ERRO_REQUIRED_FIELDS

        let buscarId = await usuario_notificacaoDAO.getUsersNotificationById(id)

        if (!buscarId || buscarId.length === 0)
            return mensagensDefault.ERRO_NOT_FOUND

        usuarioNotificacao.id_usuario_notificacao = parseInt(id)

        let result = await usuario_notificacaoDAO.setUpdateUsersNotification(usuarioNotificacao)

        if (result) {
            return mensagensDefault.SUCCESS_UPDATED_ITEM
        } else {
            return mensagensDefault.ERRO_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirUsuarioNotificacao = async function (id) {
    try {
        if (!validarAtributos.validarId(id))
            return mensagensDefault.ERRO_INVALID_ID

        let buscarId = await usuario_notificacaoDAO.getUsersNotificationById(id)

        if (!buscarId || buscarId.length === 0)
            return mensagensDefault.ERRO_NOT_FOUND

        let result = await usuario_notificacaoDAO.setDeleteUsersNotification(id)

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
    listarUsuarioNotificacao,
    listarUsuarioNotificacaoID,
    criarUsuarioNotificacao,
    atualizarUsuarioNotificacao,
    excluirUsuarioNotificacao
}