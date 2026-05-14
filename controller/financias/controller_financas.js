/***********************************************
 * Objetivo: Arquivo responsável pela manipulação da camada model de informacao
 * Autor: Kauan Antunes
 * Data: 05/05/2026
 * Versão: 1.0
 ************************************************/

const financasDAO = require("../../model/DAO/financas.js")
const mensagensDefault = require("../modulo/config_messages.js")
const validarDados = require("../modulo/validar_dados.js")
const validarAtributos = require("../modulo/validar_atributos.js")

const listarFinancas = async function () {
    try {
        let result = await financasDAO.getAllFinances()

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

const listarFinancasID = async function (id) {
    let idValidado = validarAtributos.validarValorId(id)

    try {
        if (!idValidado) {
            let result = await financasDAO.getFinanceById(id)

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

const listarFinancasDiarias = async function (idFamilia) {

    let idValidado = validarAtributos.validarId(idFamilia)
    try {
        if (idValidado) {
            let result = await financasDAO.getDailyFinances(idFamilia)

            if (result && result.length > 0) {
                mensagensDefault.HEADER.StatusCode =
                    mensagensDefault.SUCCESS_REQUEST.StatusCode
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

const listarFinancasSemanais = async function (idFamilia) {

    let idValidado = validarAtributos.validarId(idFamilia)
    try {
        if (idValidado) {
            let result = await financasDAO.getWeekFinances(idFamilia)

            if (result && result.length > 0) {
                mensagensDefault.HEADER.StatusCode =
                    mensagensDefault.SUCCESS_REQUEST.StatusCode
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

const listarFinancasMensais = async function (idFamilia) {

    let idValidado = validarAtributos.validarId(idFamilia)
    try {
        if (idValidado) {
            let result = await financasDAO.getMonthFinances(idFamilia)

            if (result && result.length > 0) {
                mensagensDefault.HEADER.StatusCode =
                    mensagensDefault.SUCCESS_REQUEST.StatusCode
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

const listarFinancasAnuais = async function (idFamilia) {

    let idValidado = validarAtributos.validarId(idFamilia)
    try {
        if (idValidado) {
            let result = await financasDAO.getYearFinances(idFamilia)

            if (result && result.length > 0) {
                mensagensDefault.HEADER.StatusCode =
                    mensagensDefault.SUCCESS_REQUEST.StatusCode
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

const criarFinancas = async function (financas, contentType) {
    try {
        let dadosValidados = validarDados.validarDadosFinancia(financas)
        let contentTypeValidado = validarAtributos.validarContentType(contentType)

        if (!contentTypeValidado)
            return mensagensDefault.ERRO_CONTENT_TYPE

        if (!dadosValidados == false)
            return mensagensDefault.ERRO_REQUIRED_FIELDS

        let result = await financasDAO.setInsertFinance(financas)
        console.log(result)
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

const atualizarFinancas = async function (financas, contentType, id) {
    try {
        let dadosValidados = validarDados.validarDadosFinancia(financas)
        let contentTypeValidado = validarAtributos.validarContentType(contentType)
        let idValidado = validarAtributos.validarValorId(id)

        if (idValidado)
            return mensagensDefault.ERRO_INVALID_ID

        if (!contentTypeValidado)
            return mensagensDefault.ERRO_CONTENT_TYPE

        if (!dadosValidados == false)
            return mensagensDefault.ERRO_REQUIRED_FIELDS

        let buscarId = await financasDAO.getFinanceById(id)

        if (!buscarId || buscarId.length === 0)
            return mensagensDefault.ERRO_NOT_FOUND

        financas.id_financas = parseInt(id)

        let result = await financasDAO.setUpdateFinance(financas)

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

const excluirFinancas = async function (id) {
    let idValidado = validarAtributos.validarValorId(id)

    try {
        if (idValidado)
            return mensagensDefault.ERRO_INVALID_ID

        let buscarId = await financasDAO.getFinanceById(id)

        if (!buscarId || buscarId.length === 0)
            return mensagensDefault.ERRO_NOT_FOUND

        let result = await financasDAO.setDeleteFinance(id)

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
    listarFinancas,
    listarFinancasID,
    listarFinancasDiarias,
    listarFinancasSemanais,
    listarFinancasMensais,
    listarFinancasAnuais,
    criarFinancas,
    atualizarFinancas,
    excluirFinancas,
}