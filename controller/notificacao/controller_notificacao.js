/***********************************************
 * Objetivo: Arquivo de responsavel pela manipulação da camada model de usuarios
 * Autor: Gustavo de Paula Silva
 * Data: 24/04/2026
 * Versão: 1.0
 ************************************************/

const notificacaoDAO = require("../../model/DAO/notificacao.js")
const mesagensDefault = require("../modulo/config_messages.js")
const validarDados = require("../modulo/validar_dados.js")
const validarAtributos = require("../modulo/validar_atributos.js")

// GET
const listarNotificacoes = async function () {
    try {
        let result = await notificacaoDAO.getAllNotifications()
        if (result) {
            if (result.length > 0) {
                mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_REQUEST.StatusCode
                mesagensDefault.HEADER.Response = result[0]
                return mesagensDefault.HEADER
            } else {
                return mesagensDefault.ERRO_NOT_FOUND
            }
        } else {
            return mesagensDefault.ERRO_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

// GET id
const listarNotificacaoID = async function (id) {
    let idValidado = validarAtributos.validarValorId(id)
    try {
        if (idValidado) {
            let result = await notificacaoDAO.getNotificationById(id)
            if (result) {
                if (result.length > 0) {
                    mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_REQUEST.StatusCode
                    mesagensDefault.HEADER.Response = result[0]
                    return mesagensDefault.HEADER
                } else {
                    return mesagensDefault.ERRO_NOT_FOUND
                }
            } else {
                return mesagensDefault.ERRO_INTERNAL_SERVER_MODEL
            }
        } else {
            return mesagensDefault.ERRO_INVALID_ID
        }
    } catch (error) {
        return mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

// POST
const criarNotificacao = async function (notificacao, contentType) {
    let dadosValidados = await validarDados.validarDadosNotificacao(notificacao)
    let contentTypeValidado = await validarAtributos.validarContentType(contentType)
    try {
        if (contentTypeValidado) {
            if (dadosValidados == true) {
                let result = await notificacaoDAO.setInsertNotification(notificacao)
                if (result) {
                    if (result.length > 0) {
                        mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_CREATED_ITEM.StatusCode
                        mesagensDefault.HEADER.Response = mesagensDefault.SUCCESS_CREATED_ITEM.message
                        return mesagensDefault.HEADER
                    } else {
                        return mesagensDefault.ERRO_NOT_FOUND
                    }
                } else {
                    return mesagensDefault.ERRO_INTERNAL_SERVER_MODEL
                }
            } else {
                return dadosValidados
            }
        } else {
            return mesagensDefault.ERRO_CONTENT_TYPE
        }
    } catch (error) {
        return mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

// PUT
const atulizarNotificacao = async function (notificacao, contentType, id) {
    let dadosValidados = await validarDados.validarDadosNotificacao(notificacao)
    let contentTypeValidado = await validarAtributos.validarContentType(contentType)
    let idValidado = validarAtributos.validarValorId(id)
    try {
        if (idValidado) {
            let buscarId = notificacaoDAO.getNotificationById(id)
            if (contentTypeValidado) {
                if (dadosValidados == true) {
                    if (buscarId) {
                        notificacao.id_notificacao = parseInt(id)
                        let result = await notificacaoDAO.setUpdateNotification(notificacao)
                        console.log(result)
                        if (result) {
                            if (result.length > 0) {
                                mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_UPDATED_ITEM.StatusCode
                                mesagensDefault.HEADER.Response = mesagensDefault.SUCCESS_UPDATED_ITEM.message
                                return mesagensDefault.HEADER
                            }
                        } else {
                            return mesagensDefault.ERRO_INTERNAL_SERVER_MODEL
                        }
                    } else {
                        return buscarId
                    }
                } else {
                    return dadosValidados
                }
            } else {
                return mesagensDefault.ERRO_CONTENT_TYPE
            }
        } else {
            return mesagensDefault.ERRO_INVALID_ID
        }
    } catch (error) {
        return mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}
// DELETE
const excluirNotificacao = async function (id) {
    let idValidado = await validarAtributos.validarValorId(id)
    try {
        if (idValidado) {
            let buscarId = await notificacaoDAO.getNotificationById(id)
            if (buscarId) {
                let result = await notificacaoDAO.setDeleteNotification(id)
                console.log(result)
                if (result) {
                    if (result.length > 0) {
                        mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_DELETED_ITEM.StatusCode
                        mesagensDefault.HEADER.Response = mesagensDefault.SUCCESS_DELETED_ITEM.message
                        return mesagensDefault.HEADER
                    }else{
                        return mesagensDefault.ERRO_NOT_FOUND
                    }
                } else {
                    return mesagensDefault.ERRO_INTERNAL_SERVER_MODEL
                }
            } else {
                return buscarId
            }
        } else {
            return mesagensDefault.ERRO_INVALID_ID
        }
    } catch (error) {
        return mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}
module.exports = {
    listarNotificacoes,
    listarNotificacaoID,
    criarNotificacao,
    atulizarNotificacao,
    excluirNotificacao
}