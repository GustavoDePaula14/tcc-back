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
                        favorita : item.favorita,
                        itens: []
                    }

                    usuario.listas.push(lista)
                }

                if (item.id_item) {
                    lista.itens.push({
                        id_lista: item.id_lista,
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
const listarListaFavoritaCompletaPorFamilia = async function (idFamilia) {
    try {
        let idValidado = validarAtributos.validarId(idFamilia)

        if (!idValidado)
            return mesagensDefault.ERRO_INVALID_ID

        let dados = await listaDAO.getFavoriteItensListsByFamily(idFamilia)

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
// POST
const criarLista = async function (lista, contentType) {
    let dadosValidados = await validarDados.validarDadosLista(lista)
    let contentTypeValidado = await validarAtributos.validarContentType(contentType)
    try {
        if (contentTypeValidado) {
            if (dadosValidados == true) {
                let result = await listaDAO.setInsertList(lista)
                let listaCriada = await listaDAO.getLastList()
                console.log(listaCriada)
                if (result) {
                    if (result.length > 0) {
                        mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_CREATED_ITEM.StatusCode
                        mesagensDefault.HEADER.Response = mesagensDefault.SUCCESS_CREATED_ITEM.message
                        mesagensDefault.HEADER.lista = listaCriada[0][0]
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

const favoritarLista = async function(id, favorita) {

    try {

        let idValidado = validarAtributos.validarId(id)

        if(!idValidado)
            return mesagensDefault.ERRO_INVALID_ID

        let result = await listaDAO.setFavoriteList(id, favorita)

        if(result){

            mesagensDefault.HEADER.StatusCode = 200
            mesagensDefault.HEADER.Response = "Favorito atualizado"

            return mesagensDefault.HEADER

        }else{
            return mesagensDefault.ERRO_INTERNAL_SERVER_MODEL
        }

    } catch(error){
        return mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}
module.exports = {
    listarListas,
    listarListaID,
    criarLista,
    atulizarLista,
    excluirLista,
    listarListaCompletaPorFamilia,
    favoritarLista,
    listarListaFavoritaCompletaPorFamilia
}