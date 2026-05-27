/***********************************************
 * Objetivo: Arquivo responsável pela manipulação da camada controller de permissão
 * Autor: Kauan Antunes
 * Data: 27/05/2026
 * Versão: 1.0
 ************************************************/

const permissaoDAO =
require("../../model/DAO/permissao");

const mensagens =
require("../modulo/config_messages");

// GET
const listarPermissoes = async function () {

    let result =
        await permissaoDAO.getAllPermissions();

    if(result && result[0].length > 0){

        const familias = {};

        result[0].forEach(item => {

            if(!familias[item.id_familia]){

                familias[item.id_familia] = {
                    id_familia: item.id_familia,
                    nome_familia: item.nome_familia,
                    usuarios: []
                };
            }

            familias[item.id_familia].usuarios.push({

                id_usuario: item.id_usuario,
                nome_usuario: item.nome_usuario,

                permissoes: {
                    editar_calendario:
                        Boolean(item.editar_calendario),

                    gerenciar_listas:
                        Boolean(item.gerenciar_listas),

                    controlar_despesas:
                        Boolean(item.controlar_despesas),

                    alterar_informacoes:
                        Boolean(item.alterar_informacoes)
                }
            });
        });

        mensagens.HEADER.StatusCode =
            mensagens.SUCCESS_REQUEST.StatusCode;

        mensagens.HEADER.Response =
            Object.values(familias);

        return mensagens.HEADER;
    }

    return mensagens.ERRO_NOT_FOUND;
};

// GET USER/FAMILY
const listarPermissaoUsuario = async function (
    id_usuario,
    id_familia
) {

    let result =
        await permissaoDAO.getPermissionByUserFamily(
            id_usuario,
            id_familia
        );

    if(result && result[0].length > 0){

        let usuario = result[0][0];

        mensagens.HEADER.StatusCode =
            mensagens.SUCCESS_REQUEST.StatusCode;

        mensagens.HEADER.Response = {

            id_familia: usuario.id_familia,
            nome_familia: usuario.nome_familia,

            usuarios: [
                {
                    id_usuario: usuario.id_usuario,
                    nome_usuario: usuario.nome_usuario,

                    permissoes: {
                        editar_calendario:
                            Boolean(usuario.editar_calendario),

                        gerenciar_listas:
                            Boolean(usuario.gerenciar_listas),

                        controlar_despesas:
                            Boolean(usuario.controlar_despesas),

                        alterar_informacoes:
                            Boolean(usuario.alterar_informacoes)
                    }
                }
            ]
        };

        return mensagens.HEADER;
    }

    return mensagens.ERRO_NOT_FOUND;
};

// POST
const criarPermissao = async function (
    dados
) {

    let result =
        await permissaoDAO.setInsertPermission(
            dados
        );

    if(result){

        mensagens.HEADER.StatusCode =
            mensagens.SUCCESS_CREATED_ITEM.StatusCode;

        mensagens.HEADER.Response =
            mensagens.SUCCESS_CREATED_ITEM.message;

        return mensagens.HEADER;
    }

    return mensagens.ERRO_INTERNAL_SERVER_MODEL;
};

// PUT
const atualizarPermissao = async function (
    dados
) {

    let result =
        await permissaoDAO.setUpdatePermission(
            dados
        );

    if(result){

        mensagens.HEADER.StatusCode =
            mensagens.SUCCESS_UPDATED_ITEM.StatusCode;

        mensagens.HEADER.Response =
            mensagens.SUCCESS_UPDATED_ITEM.message;

        return mensagens.HEADER;
    }

    return mensagens.ERRO_INTERNAL_SERVER_MODEL;
};

// DELETE
const excluirPermissao = async function (
    id_usuario,
    id_familia
) {

    let result =
        await permissaoDAO.setDeletePermission(
            id_usuario,
            id_familia
        );

    if(result){

        mensagens.HEADER.StatusCode =
            mensagens.SUCCESS_DELETED_ITEM.StatusCode;

        mensagens.HEADER.Response =
            mensagens.SUCCESS_DELETED_ITEM.message;

        return mensagens.HEADER;
    }

    return mensagens.ERRO_INTERNAL_SERVER_MODEL;
};

module.exports = {
    listarPermissoes,
    listarPermissaoUsuario,
    criarPermissao,
    atualizarPermissao,
    excluirPermissao
};