/***********************************************
 * Objetivo: Arquivo de responsavel pela manipulação da camada model de usuarios
 * Autor: Gustavo de Paula Silva
 * Data: 24/04/2026
 * Versão: 1.0
 ************************************************/

const usuarioDAO = require("../../model/DAO/usuario.js")
const mesagensDefault = require("../modulo/config_messages.js")
const validarDados = require("../modulo/validar_dados.js")
const validarAtributos = require("../modulo/validar_atributos.js")

// GET +
const listarUsuarios = async function(){
    try {
        let result = await usuarioDAO.getAllUsers()
        if(result){
            if(result.length > 0){
                // console.log(result.length)
                mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_REQUEST.StatusCode
                mesagensDefault.HEADER.Response.usuarios = result[0]
                console.log(mesagensDefault.HEADER.Response.usuarios)
                return mesagensDefault.HEADER
            }else{
                return mesagensDefault.ERRO_NOT_FOUND
            }  
        }else{
            return mesagensDefault.ERRO_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

// GET id + 
const listarUsuarioID = async function(id){
    let idValidado = validarAtributos.validarValorId(id)
    // console.log(idValidado)
    try {
        if(!idValidado){
            let result = await usuarioDAO.getUserById(id)
            // console.log(result)
            if(result){
                if(result.length > 0){
                    mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_REQUEST.StatusCode
                    mesagensDefault.HEADER.Response.usuario = result[0]
                    return mesagensDefault.HEADER
                }else{
                    return mesagensDefault.ERRO_NOT_FOUND
                }
            }else{
                return mesagensDefault.ERRO_INTERNAL_SERVER_MODEL
            }    
        }else{
            return mesagensDefault.ERRO_INVALID_ID
        }
    } catch (error) {
        return mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}
// POST
const criarUsuario = async function(usuario, contentType) {
    let dadosValidados = validarDados.validarDadosUsuario(usuario)
    let contentTypeValidado = validarAtributos.validarContentType(contentType)
    try {
        if(contentTypeValidado){
            if(dadosValidados){
                let result = await usuarioDAO.setInsertUser(usuario)
                if(result){
                    if(result.length > 0){
                        mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_CREATED_ITEM.StatusCode
                        mesagensDefault.HEADER.Response = mesagensDefault.SUCCESS_CREATED_ITEM.message
                        return mesagensDefault.HEADER
                    }else{
                        return mesagensDefault.ERRO_NOT_FOUND
                    }
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
        return mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}

// PUT
const atulizarUsuario = async function(usuario, contentType, id) {
    let dadosValidados = validarDados.validarDadosUsuario(usuario)
    let contentTypeValidado = validarAtributos.validarContentType(contentType)
    let idValidado = validarAtributos.validarValorId(id)
    try {
        if(idValidado){
            let buscarId = usuarioDAO.getUserById(id)
            if(contentTypeValidado){
                if(dadosValidados){
                    if(buscarId.StatusCode == 200){
                        usuario.id_usuario = parseInt(id)
                        let result = await usuarioDAO.setUpdateUser(usuario)
                        if(result){
                            if(result.length > 0){
                                mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_UPDATED_ITEM.StatusCode
                                mesagensDefault.HEADER.Response = mesagensDefault.SUCCESS_UPDATED_ITEM.message
                            }
                        }else{
                            mesagensDefault.ERRO_INTERNAL_SERVER_MODEL
                        }
                    }else{
                        return buscarId
                    }
                }else{
                    mesagensDefault.ERRO_REQUIRED_FIELDS
                }
            }else{
                mesagensDefault.ERRO_CONTENT_TYPE
            }
        }else{
            mesagensDefault.ERRO_INVALID_ID
        }
    } catch (error) {
        mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}
// DELETE
const excluirUsuario = async function(id) {
    let idValidado = validarAtributos.validarValorId(id)
    try {
        if(idValidado){
            let buscarId = await usuarioDAO.getUserById(id)
            if(buscarId.StatusCode == 200){
                let result = await usuarioDAO.setDeleteUser(id)
                if(result){
                    if(result.length > 0){
                        mesagensDefault.HEADER.StatusCode = mesagensDefault.SUCCESS_DELETED_ITEM.StatusCode
                        mesagensDefault.HEADER.Response = mesagensDefault.SUCCESS_DELETED_ITEM.message
                    }
                }else{
                    mesagensDefault.ERRO_INTERNAL_SERVER_MODEL
                }
            }else{
                return buscarId
            }
        }else{
            mesagensDefault.ERRO_INVALID_ID
        }
    } catch (error) {
        mesagensDefault.ERRO_INTERNAL_SERVER_CONTROLLER
    }
}
module.exports = {
    listarUsuarioID,
    listarUsuarios,
    excluirUsuario,
    atulizarUsuario,
    criarUsuario,
}