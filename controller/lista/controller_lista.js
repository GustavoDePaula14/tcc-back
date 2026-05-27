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
const listarListaCompletaPorFamilia = async function (idFamilia) {
    try {
        let idValidado = validarAtributos.validarId(idFamilia)

        if (!idValidado)
            return mesagensDefault.ERRO_INVALID_ID

        let dados = await listaDAO.getAllItensListsByFamily(idFamilia)

        if (!dados || dados.length === 0)
            return mesagensDefault.ERRO_NOT_FOUND

        const familia = {
            id_familia: dados[0].id_familia,
            nome_familia: dados[0].nome_familia,
            usuarios: []
        }

        dados.forEach(item => {
            let usuario = familia.usuarios.find(
                usuario => usuario.id_usuario === item.id_usuario
            )

            if (!usuario) {
                usuario = {
                    id_usuario: item.id_usuario,
                    nome_usuario: item.nome_usuario,
                    email: item.email,
                    is_admin: item.is_admin,
                    listas: []
                }

                familia.usuarios.push(usuario)
            }

            if (item.id_lista) {
                let lista = usuario.listas.find(
                    lista => lista.id_lista === item.id_lista
                )

                if (!lista) {
                    lista = {
                        id_lista: item.id_lista,
                        nome_lista: item.nome_lista,
                        itens: []
                    }

                    usuario.listas.push(lista)
                }

                if (item.id_item) {
                    lista.itens.push({
                        id_item: item.id_item,
                        nome_item: item.nome_item,
                        quantidade: item.quantidade,
                        valor_unitario: item.valor_unitario,
                        valor_total: item.valor_total,
                        comprado: item.comprado
                    })
                }
            }
        })

        mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_REQUEST.StatusCode
        mesagensDefault.HEADER.Response = familia

        return mesagensDefault.HEADER

    } catch (error) {
        return mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}