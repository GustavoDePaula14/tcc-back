/***********************************************
 * Objetivo: Arquivo de responsavel pela manipulação da camada model de familia
 * Autor: Gustavo de Paula Silva
 * Data: 27/04/2026
 * Versão: 1.0
 ************************************************/
const listaDAO = require("../../model/DAO/lista.js")
const mesagensDefault = require("../modulo/config_messages.js")
const validarDados = require("../modulo/validar_dados.js")
const validarAtributos = require("../modulo/validar_atributos.js")

//GET
const listarListas = async function () {
    try {
        let result = await listaDAO.getAllLists()
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
const listarListaID = async function (id) {
    let idValidado = await validarAtributos.validarValorId(id)
    try {
        if (idValidado) {
            let result = await listaDAO.getListById(id)
            console.log(result)
            if (result) {
                mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_REQUEST.StatusCode
                mesagensDefault.HEADER.Response = result
                return mesagensDefault.HEADER
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
const listarListaCompletaID = async function (id) {
    try {
        let result = await listaDAO.getAllItensListsById(id)
        if (result) {
            mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_REQUEST.StatusCode
            mesagensDefault.HEADER.Response = result
            return mesagensDefault.HEADER
        } else {
            return mesagensDefault.ERRO_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}
// POST
const criarLista = async function (lista, contentType) {
    let dadosValidados = await validarDados.validarDadosLista(lista)
    let contentTypeValidado = await validarAtributos.validarContentType(contentType)
    try {
        if (contentTypeValidado) {
            if (dadosValidados == true) {
                let result = await listaDAO.setInsertList(lista)
                console.log(result)
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
const atulizarLista = async function (lista, contentType, id) {
    let dadosValidados = await validarDados.validarDadosLista(lista)
    let contentTypeValidado = await validarAtributos.validarContentType(contentType)
    let idValidado = validarAtributos.validarValorId(id)
    try {

        if (idValidado) {
            let buscarId = await listaDAO.getListById(id)
            if (contentTypeValidado) {
                if (dadosValidados == true) {
                    if (buscarId) {
                        lista.id_lista = parseInt(id)
                        let result = await listaDAO.setUpdateList(lista)
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
const excluirLista = async function (id) {
    let idValidado = await validarAtributos.validarValorId(id)
    try {
        if (idValidado) {
            let buscarId = await listaDAO.getListById(id)
            if (buscarId) {
                let result = await listaDAO.setDeleteList(id)

                if (result) {
                    if (result.length > 0) {
                        mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_DELETED_ITEM.StatusCode
                        mesagensDefault.HEADER.Response = mesagensDefault.SUCCESS_DELETED_ITEM.message
                        return mesagensDefault.HEADER
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
    listarListas,
    listarListaID,
    criarLista,
    atulizarLista,
    excluirLista,
    listarListaCompletaID
}