/***********************************************
 * Objetivo: Arquivo responsável pela manipulação da camada model de endereco
 * Autor: Gustavo de Paula Silva
 * Data: 06/05/2026
 * Versão: 1.0
 ************************************************/

const enderecoDAO = require("../../model/DAO/endereco.js")
const mensagensDefault = require("../modulo/config_messages.js")
const validarDados = require("../modulo/validar_dados.js")
const validarAtributos = require("../modulo/validar_atributos.js")

const listarEndereco = async function () {
    try {
        let result = await enderecoDAO.getAllAddresses()
        if (result) {
            if (result.length > 0) {
                mensagensDefault.HEADER.StatusCode = mensagensDefault.SUCCESS_REQUEST.StatusCode
                mensagensDefault.HEADER.Response = result[0]
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

const listarEnderecoID = async function (id) {
    let idValidado = validarAtributos.validarValorId(id)

    try {
        if (!idValidado) {
            let result = await enderecoDAO.getAddressById(id)

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

const criarEndereco = async function (endereco, contentType) {
    try {
        let dadosValidados = validarDados.validarDadosInformacao(endereco)
        let contentTypeValidado = validarAtributos.validarContentType(contentType)

        if (!contentTypeValidado)
            return mensagensDefault.ERRO_CONTENT_TYPE

        if (!dadosValidados == false)
            return dadosValidados

        let result = await enderecoDAO.setInsertAddress(endereco)
        // console.log(result)
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

const atualizarEndereco = async function (endereco, contentType, id) {
    try {
        let dadosValidados = validarDados.validarDadosInformacao(endereco)
        let contentTypeValidado = validarAtributos.validarContentType(contentType)
        let idValidado = validarAtributos.validarValorId(id)

        if (idValidado)
            return mensagensDefault.ERRO_INVALID_ID

        if (!contentTypeValidado)
            return mensagensDefault.ERRO_CONTENT_TYPE

        if (!dadosValidados == false)
            return dadosValidados

        let buscarId = await enderecoDAO.getAddressById(id)
        if (!buscarId || buscarId.length === 0)
            return mensagensDefault.ERRO_NOT_FOUND

        endereco.id_endereco = parseInt(id)

        let result = await enderecoDAO.setUpdateAddress(endereco)
        console.log(result)

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

const excluirEndereco = async function (id) {
    let idValidado = validarAtributos.validarValorId(id)

    try {
        if (idValidado)
            return mensagensDefault.ERRO_INVALID_ID

        let buscarId = await enderecoDAO.getAddressById(id)

        if (!buscarId || buscarId.length === 0)
            return mensagensDefault.ERRO_NOT_FOUND

        let result = await enderecoDAO.setDeleteAddress(id)

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
    listarEndereco,
    listarEnderecoID,
    criarEndereco,
    atualizarEndereco,
    excluirEndereco
}