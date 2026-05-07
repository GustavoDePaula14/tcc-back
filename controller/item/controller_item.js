/***********************************************
 * Objetivo: Arquivo de responsavel pela manipulação da camada model de familia
 * Autor: Gustavo de Paula Silva
 * Data: 27/04/2026
 * Versão: 1.0
 ************************************************/
const itemDAO = require("../../model/DAO/item.js")
const mesagensDefault = require("../modulo/config_messages.js")
const validarDados = require("../modulo/validar_dados.js")
const validarAtributos = require("../modulo/validar_atributos.js")

//GET
const listarItens = async function () {
    try {
        let result = await itemDAO.getAllItens()
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
//GET id
const listarItemID = async function (id) {
    let idValidado = validarAtributos.validarValorId(id)
    try {
        if (idValidado) {
            let result = await itemDAO.getItenById(id)
            if (result) {
                if (result.length > 0) {
                    mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_REQUEST.StatusCode
                    mesagensDefault.HEADER.Response = result[0]
                } else {
                    mesagensDefault.ERRO_NOT_FOUND
                }
            } else {
                mesagensDefault.ERRO_INTERNAL_SERVER_MODEL
            }
        } else {
            mesagensDefault.ERRO_INVALID_ID
        }
    } catch (error) {
        mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

// POST
const criarItem = async function (item, contentType) {
    let dadosValidados = validarDados.validarDadosItens(item)
    let contentTypeValidado = validarAtributos.validarContentType(contentType)
    try {
        if (contentTypeValidado) {
            if (dadosValidados == true) {
                let result = await itemDAO.setInsertIten(item)
                if (result) {
                    if (result.length > 0) {
                        mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_CREATED_ITEM.StatusCode
                        mesagensDefault.HEADER.Response = mesagensDefault.SUCCESS_CREATED_ITEM.message
                    } else {
                        mesagensDefault.ERRO_NOT_FOUND
                    }
                } else {
                    mesagensDefault.ERRO_INTERNAL_SERVER_MODEL
                }
            } else {
                mesagensDefault.ERRO_REQUIRED_FIELDS
            }
        } else {
            mesagensDefault.ERRO_CONTENT_TYPE
        }
    } catch (error) {
        mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}
// PUT
const atulizarItem = async function (item, contentType, id) {
    let dadosValidados = validarDados.validarDadosItens(item)
    let contentTypeValidado = validarAtributos.validarContentType(contentType)
    let idValidado = validarAtributos.validarValorId(id)

    try {
        if (idValidado) {
            let buscarId = itemDAO.getItenById(id)
            if (contentTypeValidado) {
                if (dadosValidados == true) {
                    if (buscarId) {
                        item.id_item = parseInt(id)
                        let result = await itemDAO.setUpdateIten(item)
                        if (result) {
                            if (result.length > 0) {
                                mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_UPDATED_ITEM.StatusCode
                                mesagensDefault.HEADER.Response = mesagensDefault.SUCCESS_UPDATED_ITEM.message
                            }
                        } else {
                            mesagensDefault.ERRO_INTERNAL_SERVER_MODEL
                        }
                    } else {
                        return buscarId
                    }
                } else {
                    mesagensDefault.ERRO_REQUIRED_FIELDS
                }
            } else {
                mesagensDefault.ERRO_CONTENT_TYPE
            }
        } else {
            mesagensDefault.ERRO_INVALID_ID
        }
    } catch (error) {
        mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}
// DELETE
const excluirItem = async function (id) {
    let idValidado = validarAtributos.validarValorId(id)
    try {
        if (idValidado) {
            let buscarId = await itemDAO.getItenById(id)
            if (buscarId.StatusCode == 200) {
                let result = await itemDAO.setDeleteIten(id)
                if (result) {
                    if (result.length > 0) {
                        mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_DELETED_ITEM.StatusCode
                        mesagensDefault.HEADER.Response = mesagensDefault.SUCCESS_DELETED_ITEM.message
                    }
                } else {
                    mesagensDefault.ERRO_INTERNAL_SERVER_MODEL
                }
            } else {
                return buscarId
            }
        } else {
            mesagensDefault.ERRO_INVALID_ID
        }
    } catch (error) {
        mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}
module.exports = {
    listarItemID,
    listarItens,
    criarItem,
    atulizarItem,
    excluirItem
}