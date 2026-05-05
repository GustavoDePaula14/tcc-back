/***********************************************
 * Objetivo: Arquivo responsável pela manipulação da camada model de informacao
 * Autor: Kauan Antunes
 * Data: 05/05/2026
 * Versão: 1.0
 ************************************************/

const informacaoDAO = require("../../model/DAO/informacao.js")
const mensagensDefault = require("../modulo/config_messages.js")
const validarDados = require("../modulo/validar_dados.js")
const validarAtributos = require("../modulo/validar_atributos.js")

const listarInformacao = async function () {
    try {
        let result = await informacaoDAO.getAllInformations()

        if (result) {
            if (result.length > 0) {
                mensagensDefault.HEADER.StatusCode = mensagensDefault.SUCCESS_REQUEST.StatusCode
                mensagensDefault.HEADER.Response = result
                return mensagensDefault.HEADER
            } else {
                return mensagensDefault.ERRO_NOT_FOUND
            }
        } else {
            return mensagensDefault.ERRO_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

const listarInformacaoID = async function (id) {
    let idValidado = validarAtributos.validarValorId(id)

    try {
        if (!idValidado) {
            let result = await informacaoDAO.getInformationById(id)

            if (result && result.length > 0) {
                mensagensDefault.HEADER.StatusCode = mensagensDefault.SUCCESS_REQUEST.StatusCode
                mensagensDefault.HEADER.Response = result[0]
                return mensagensDefault.HEADER
            } else {
                return mensagensDefault.ERRO_NOT_FOUND
            }

        } else {
            return mensagensDefault.ERRO_INVALID_ID
        }

    } catch (error) {
        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

const criarInformacao = async function (informacao, contentType) {
    try {
        let dadosValidados = validarDados.validarDadosInformacao(informacao)
        let contentTypeValidado = validarAtributos.validarContentType(contentType)

        if (!contentTypeValidado)
            return mensagensDefault.ERRO_CONTENT_TYPE

        if (!dadosValidados)
            return mensagensDefault.ERRO_REQUIRED_FIELDS

        let result = await informacaoDAO.setInsertInformation(informacao)

        if (result) {
            mensagensDefault.HEADER.StatusCode = mensagensDefault.SUCCESS_CREATED_ITEM.StatusCode
            mensagensDefault.HEADER.Response = mensagensDefault.SUCCESS_CREATED_ITEM.message
            return mensagensDefault.HEADER
        } else {
            return mensagensDefault.ERRO_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarInformacao = async function (informacao, contentType, id) {
    try {
        let dadosValidados = validarDados.validarDadosInformacao(informacao)
        let contentTypeValidado = validarAtributos.validarContentType(contentType)
        let idValidado = validarAtributos.validarValorId(id)

        if (idValidado)
            return mensagensDefault.ERRO_INVALID_ID

        if (!contentTypeValidado)
            return mensagensDefault.ERRO_CONTENT_TYPE

        if (!dadosValidados)
            return mensagensDefault.ERRO_REQUIRED_FIELDS

        let buscarId = await informacaoDAO.getInformationById(id)

        if (!buscarId || buscarId.length === 0)
            return mensagensDefault.ERRO_NOT_FOUND

        informacao.id_info = parseInt(id)

        let result = await informacaoDAO.setUpdateInformation(informacao)

        if (result) {
            mensagensDefault.HEADER.StatusCode = mensagensDefault.SUCCESS_UPDATED_ITEM.StatusCode
            mensagensDefault.HEADER.Response = mensagensDefault.SUCCESS_UPDATED_ITEM.message
            return mensagensDefault.HEADER
        } else {
            return mensagensDefault.ERRO_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirInformacao = async function (id) {
    let idValidado = validarAtributos.validarValorId(id)

    try {
        if (idValidado)
            return mensagensDefault.ERRO_INVALID_ID

        let buscarId = await informacaoDAO.getInformationById(id)

        if (!buscarId || buscarId.length === 0)
            return mensagensDefault.ERRO_NOT_FOUND

        let result = await informacaoDAO.setDeleteInformation(id)

        if (result) {
            mensagensDefault.HEADER.StatusCode = mensagensDefault.SUCCESS_DELETED_ITEM.StatusCode
            mensagensDefault.HEADER.Response = mensagensDefault.SUCCESS_DELETED_ITEM.message
            return mensagensDefault.HEADER
        } else {
            return mensagensDefault.ERRO_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return mensagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    listarInformacao,
    listarInformacaoID,
    criarInformacao,
    atualizarInformacao,
    excluirInformacao,
}