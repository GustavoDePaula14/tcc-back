/***********************************************
 * Objetivo: Arquivo de responsavel pela manipulação da camada model de familia
 * Autor: Gustavo de Paula Silva
 * Data: 24/04/2026
 * Versão: 1.0
 ************************************************/
const familiaDAO = require("../../model/DAO/familia.js")
const mesagensDefault = require("../modulo/config_messages.js")
const validarDados = require("../modulo/validar_dados.js")
const validarAtributos = require("../modulo/validar_atributos.js")

//GET
const listarFamilias = async function () {
    try {
        let result = await familiaDAO.getAllFamilys()
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
const listarFamiliaID = async function (id) {
    let idValidado = validarAtributos.validarValorId(id)
    try {
        if (idValidado) {
            let result = await familiaDAO.getFamilyById(id)
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
// POST PROCEDURE
const criarFamiliaEndereco = async function(familia, contentType) {

    let dadosValidados =
        await validarDados.validarDadosFamiliaEndereco(familia)

    let contentTypeValidado =
        validarAtributos.validarContentType(contentType)

    try {
        if(contentTypeValidado){

            if(dadosValidados){

                let result =
                    await familiaDAO.setInsertFamilyAddress(familia)

                if(result){

                    mesagensDefault.HEADER.StatusCode =
                        mesagensDefault.SUCCESS_CREATED_ITEM.StatusCode

                    mesagensDefault.HEADER.Response =
                        mesagensDefault.SUCCESS_CREATED_ITEM.message

                    return mesagensDefault.HEADER

                }else{
                    return mesagensDefault.ERRO_INTERNAL_SERVER_MODEL
                }

            }else{
                return mesagensDefault.ERRO_REQUIRED_FIELDS
            }

        }else{
            return mesagensDefault.ERRO_CONTENT_TYPE
        }

    } catch (error) {
        console.log(error)
        return mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

//POST
const criarFamilia = async function (familia, contentType) {
    try {
        let dadosValidados = await validarDados.validarDadosFamilia(familia)
        let contentTypeValidado = validarAtributos.validarContentType(contentType)
        if (contentTypeValidado) {
            if (dadosValidados == true) {
                let result = await familiaDAO.setInsertFamily(familia)
                if (result) {
                    // console.log(result)
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
//PUT
const atulizarFamilia = async function (familia, contentType, id) {
    let dadosValidados = await validarDados.validarDadosFamilia(familia)
    let contentTypeValidado = validarAtributos.validarContentType(contentType)
    let idValidado = validarAtributos.validarValorId(id)
    try {
        if (idValidado) {
            let buscarId = familiaDAO.getFamilyById(id)
            if (contentTypeValidado) {
                if (dadosValidados == true) {
                    if (buscarId || buscarId.length !== 0) {
                        familia.id_familia = parseInt(id)
                        let result = await familiaDAO.setUpdateFamily(familia)
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
                        return mesagensDefault.ERRO_INVALID_ID
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
//DELETE
const excluirFamilia = async function (id) {
    let idValidado = validarAtributos.validarValorId(id)
    try {
        if (idValidado) {
            let buscarId = await familiaDAO.getFamilyById(id)
            if (buscarId || buscarId.length !== 0) {
                let result = await familiaDAO.setDeleteFamily(id)
                // console.log(result[0])
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
                return mesagensDefault.ERRO_NOT_FOUND
            }
        } else {
            return mesagensDefault.ERRO_INVALID_ID
        }
    } catch (error) {
        return mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}
module.exports = {
    listarFamiliaID,
    listarFamilias,
    criarFamilia,
    atulizarFamilia,
    excluirFamilia,
    criarFamiliaEndereco
}