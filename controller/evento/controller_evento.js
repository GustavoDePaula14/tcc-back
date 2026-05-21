/***********************************************
 * Objetivo: Arquivo responsável pela manipulação da camada model de evento
 * Autor: Gustavo de Paula Silva
 * Data: 24/04/2026
 * Versão: 1.1
 ************************************************/

const eventoDAO = require("../../model/DAO/eventos.js")
const mensagensDefault = require("../modulo/config_messages.js")
const validarDados = require("../modulo/validar_dados.js")
const validarAtributos = require("../modulo/validar_atributos.js")

// GET ALL
const listarEventos = async function () {

    try {

        let result = await eventoDAO.getAllEvents()

        if (result) {

            if (result.length > 0) {

                mensagensDefault.HEADER.StatusCode =
                    mensagensDefault.SUCCESS_REQUEST.StatusCode

                mensagensDefault.HEADER.Response = result

                return mensagensDefault.HEADER

            } else {

                return mensagensDefault.ERRO_NOT_FOUND
            }

        } else {

            return mensagensDefault.ERRO_INTERNAL_SERVER_MODEL
        }

    } catch (error) {

        console.log(error)

        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

// GET BY ID
const listarEventoID = async function (id) {

    let idValidado = validarAtributos.validarValorId(id)

    try {

        if (!idValidado) {

            return mensagensDefault.ERRO_INVALID_ID
        }

        let result = await eventoDAO.getEventById(id)

        if (result && result.length > 0) {

            mensagensDefault.HEADER.StatusCode =
                mensagensDefault.SUCCESS_REQUEST.StatusCode

            mensagensDefault.HEADER.Response = result[0]

            return mensagensDefault.HEADER

        } else {

            return mensagensDefault.ERRO_NOT_FOUND
        }

    } catch (error) {

        console.log(error)

        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

const listarEventosFamilia = async function(idFamilia) {

    let idValidado =
        validarAtributos.validarId(idFamilia)

    try {

        if (!idValidado) {

            return mensagensDefault.ERRO_INVALID_ID
        }

        let result =
            await eventoDAO.getEventsByFamily(idFamilia)

        if (result && result.length > 0) {

            mensagensDefault.HEADER.StatusCode =
                mensagensDefault.SUCCESS_REQUEST.StatusCode

            mensagensDefault.HEADER.Response = result

            return mensagensDefault.HEADER

        } else {

            return mensagensDefault.ERRO_NOT_FOUND
        }

    } catch (error) {

        console.log(error)

        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

// POST
const criarEvento = async function (evento, contentType) {

    try {

        let dadosValidados =
            await validarDados.validarDadosEvento(evento)

        let contentTypeValidado =
            validarAtributos.validarContentType(contentType)

        if (!contentTypeValidado) {

            return mensagensDefault.ERRO_CONTENT_TYPE
        }

        if (!dadosValidados) {

            return mensagensDefault.ERRO_REQUIRED_FIELDS
        }

        let result = await eventoDAO.setInsertEvent(evento)

        if (result) {

            mensagensDefault.HEADER.StatusCode =
                mensagensDefault.SUCCESS_CREATED_ITEM.StatusCode

            mensagensDefault.HEADER.Response = {
                message: mensagensDefault.SUCCESS_CREATED_ITEM.message,
                id_evento: result
            }

            return mensagensDefault.HEADER

        } else {

            return mensagensDefault.ERRO_INTERNAL_SERVER_MODEL
        }

    } catch (error) {

        console.log(error)

        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

// PUT
const atualizarEvento = async function (evento, contentType, id) {

    try {

        let dadosValidados =
            await validarDados.validarDadosEvento(evento)

        let contentTypeValidado =
            validarAtributos.validarContentType(contentType)

        let idValidado =
            validarAtributos.validarValorId(id)

        if (!idValidado) {

            return mensagensDefault.ERRO_INVALID_ID
        }

        if (!contentTypeValidado) {

            return mensagensDefault.ERRO_CONTENT_TYPE
        }

        if (!dadosValidados) {

            return mensagensDefault.ERRO_REQUIRED_FIELDS
        }

        let buscarId = await eventoDAO.getEventById(id)

        if (!buscarId || buscarId.length === 0) {

            return mensagensDefault.ERRO_NOT_FOUND
        }

        evento.id_evento = parseInt(id)

        let result = await eventoDAO.setUpdateEvent(evento)

        if (result) {

            mensagensDefault.HEADER.StatusCode =
                mensagensDefault.SUCCESS_UPDATED_ITEM.StatusCode

            mensagensDefault.HEADER.Response =
                mensagensDefault.SUCCESS_UPDATED_ITEM.message

            return mensagensDefault.HEADER

        } else {

            return mensagensDefault.ERRO_INTERNAL_SERVER_MODEL
        }

    } catch (error) {

        console.log(error)

        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

// DELETE
const excluirEvento = async function (id) {

    let idValidado =
        validarAtributos.validarValorId(id)

    try {

        if (!idValidado) {

            return mensagensDefault.ERRO_INVALID_ID
        }

        let buscarId = await eventoDAO.getEventById(id)

        if (!buscarId || buscarId.length === 0) {

            return mensagensDefault.ERRO_NOT_FOUND
        }

        let result = await eventoDAO.setDeleteEvent(id)

        if (result) {

            mensagensDefault.HEADER.StatusCode =
                mensagensDefault.SUCCESS_DELETED_ITEM.StatusCode

            mensagensDefault.HEADER.Response =
                mensagensDefault.SUCCESS_DELETED_ITEM.message

            return mensagensDefault.HEADER

        } else {

            return mensagensDefault.ERRO_INTERNAL_SERVER_MODEL
        }

    } catch (error) {

        console.log(error)

        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    listarEventos,
    listarEventoID,
    listarEventosFamilia,
    criarEvento,
    atualizarEvento,
    excluirEvento
}