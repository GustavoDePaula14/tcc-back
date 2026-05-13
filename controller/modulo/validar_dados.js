/***********************************************
 * Objetivo: Arquivo de responsavel pela validação de conteudo do body
 * Autor: Gustavo de Paula Silva
 * Data: 24/04/2026 & 27/04/2026
 * Versão: 1.0
 ************************************************/

const mesagensDefault = require("./config_messages")

const validarDadosUsuario = async function (usuario) {
    try {
        if (usuario.nome == null || usuario.nome == "" || usuario.nome == undefined || usuario.nome.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "nome"
            console.log(usuario.nome)
            return mesagensDefault.ERRO_NOT_FOUND

        } else if (usuario.cpf == null || usuario.cpf == "" || usuario.cpf == undefined || usuario.cpf.length > 14) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "cpf"
            console.log(usuario.cpf)
            return mesagensDefault.ERRO_NOT_FOUND

        } else if (usuario.data_nascimento == null || usuario.data_nascimento == "" || usuario.data_nascimento == undefined || usuario.data_nascimento.length > 14) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "data_nascimento"
            return mesagensDefault.ERRO_NOT_FOUND

        } else if (usuario.senha == null || usuario.senha == "" || usuario.senha == undefined || usuario.senha.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "senha"
            return mesagensDefault.ERRO_NOT_FOUND

        } else if (usuario.email == null || usuario.email == "" || usuario.email == undefined || usuario.email.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "email"
            return mesagensDefault.ERRO_NOT_FOUND

        } else {
            return true
        }
    } catch (error) {
        console.log(error)
    }
}
const validarDadosFamilia = async function (familia) {
    try {
        if (familia.nome == null || familia.nome == "" || familia.nome == undefined || familia.nome.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "nome"
            return mesagensDefault.ERRO_NOT_FOUND
        } else if (familia.telefone_residencial == null || familia.telefone_residencial == "" || familia.telefone_residencial == undefined || familia.telefone_residencial.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "telefone_residencial"
            return mesagensDefault.ERRO_NOT_FOUND
        } else {
            return true
        }
    } catch (error) {
        console.log(error)
    }
}
const validarDadosEvento = async function (evento) {
    try {
        if (evento.titulo == null || evento.titulo == "" || evento.titulo == undefined || evento.titulo.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "titulo"
            return mesagensDefault.ERRO_NOT_FOUND
        } else if (evento.descricao == null || evento.descricao == "" || evento.descricao == undefined || evento.descricao.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "descricao"
            return mesagensDefault.ERRO_NOT_FOUND
        } else if (evento.data == null || evento.data == "" || evento.data == undefined || evento.data.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "data"
            return mesagensDefault.ERRO_NOT_FOUND
        } else {
            return true
        }
    } catch (error) {
        console.log(error)
    }
}
const validarDadosItens = async function (item) {
    try {
        if (item.nome_item == null || item.nome_item == "" || item.nome_item == undefined || item.nome_item.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "nome_item"
            return mesagensDefault.ERRO_NOT_FOUND
        } else if (item.quantidade == null || item.quantidade == "" || item.quantidade == undefined || isNaN(item.quantidade)) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "quantidade"
            return mesagensDefault.ERRO_NOT_FOUND
        } else if (item.valor_unitario == null || item.valor_unitario == "" || item.valor_unitario == undefined || isNaN(item.valor_unitario)) {
v        } else if (item.comprado == null || item.comprado == undefined || item.comprado != true || item.comprado != false) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "valor_unitario"
            return mesagensDefault.ERRO_NOT_FOUND
        } else {
            return true
        }
    } catch (error) {
        console.log(error)
    }
}
const validarDadosLista = async function (lista) {
    try {
        if (lista.nome_lista == null || lista.nome_lista == "" || lista.nome_lista == undefined || lista.nome_lista.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "nome_lista"
            return mesagensDefault.ERRO_NOT_FOUND
        } else {
            return true
        }
    } catch (error) {
        console.log(error)
    }
}
const validarDadosInformacao = async function (informacao) {
    try {
        if (informacao.titulo == null || informacao.titulo == "" || informacao.titulo == undefined || informacao.titulo.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "titulo"
            return mesagensDefault.ERRO_NOT_FOUND
        } else if (informacao.descricao == null || informacao.descricao == "" || informacao.descricao == undefined || informacao.descricao.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "descricao"
            return mesagensDefault.ERRO_NOT_FOUND
        } else {
            return true
        }
    } catch (error) {
        console.log(error)
    }
}
const validarDadosFinancia = async function (financia) {
    try {
        if (financia.tipo == null || financia.tipo == "" || financia.tipo == undefined || financia.tipo.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "tipo"
            return mesagensDefault.ERRO_NOT_FOUND
        } else if (financia.descricao == null || financia.descricao == "" || financia.descricao == undefined || financia.descricao.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "descricao"
            return mesagensDefault.ERRO_NOT_FOUND
        } else if (financia.valor == null || financia.valor == "" || financia.valor == undefined || isNaN(financia.valor)) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "valor"
            return mesagensDefault.ERRO_NOT_FOUND
        } else if (financia.icone == null || financia.icone == "" || financia.icone == undefined || financia.icone.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "icone"
            return mesagensDefault.ERRO_NOT_FOUND
        } else {
            return true
        }
    } catch (error) {
        console.log(error)
    }
}
const validarDadosNotificacao = async function (notificacao) {
    try {
        if (notificacao.titulo == null || notificacao.titulo == "" || notificacao.titulo == undefined || notificacao.titulo.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "titulo"
            return mesagensDefault.ERRO_NOT_FOUND
        } else if (notificacao.descricao == null || notificacao.descricao == "" || notificacao.descricao == undefined || notificacao.descricao.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "descricao"
            return mesagensDefault.ERRO_NOT_FOUND
        } else if (notificacao.data == null || notificacao.data == "" || notificacao.data == undefined || notificacao.data.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "data"
            return mesagensDefault.ERRO_NOT_FOUND
        } else {
            return true
        }
    } catch (error) {
        console.log(error)
    }
}
const validarDadosEndereco = async function(endereco) {
    try {
        if (endereco.cep == null || endereco.cep == "" || endereco.cep == undefined || isNaN(endereco.cep)) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "cep"
            return mesagensDefault.ERRO_NOT_FOUND
        }else if (endereco.estado == null || endereco.estado == "" || endereco.estado == undefined || endereco.estado.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "estado"
            return mesagensDefault.ERRO_NOT_FOUND
        }else if (endereco.cidade == null || endereco.cidade == "" || endereco.cidade == undefined || endereco.cidade.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "cidade"
            return mesagensDefault.ERRO_NOT_FOUND
        }else if (endereco.bairro == null || endereco.bairro == "" || endereco.bairro == undefined || endereco.bairro.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "bairro"
            return mesagensDefault.ERRO_NOT_FOUND
        }else if (endereco.logradouro == null || endereco.logradouro == "" || endereco.logradouro == undefined || endereco.logradouro.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "logradouro"
            return mesagensDefault.ERRO_NOT_FOUND
        }else if (endereco.complemento == null || endereco.complemento == "" || endereco.complemento == undefined || endereco.complemento.length > 100) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "complemento"
            return mesagensDefault.ERRO_NOT_FOUND
        }else if (endereco.numero == null || endereco.numero == "" || endereco.numero == undefined || isNaN(endereco.numero)) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "numero"
            return mesagensDefault.ERRO_NOT_FOUND
        } else{
            return true
        }
    } catch (error) {
        
    }
}

const validarUsuarioInformacao = (usuarioInformacao) => {
    try {
        if (usuarioInformacao.id_usuario == null || usuarioInformacao.id_usuario == "" || isNaN(usuarioInformacao.id_usuario) || usuarioInformacao.id_usuario <= 0) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "id_usuario"
            return mesagensDefault.ERRO_NOT_FOUND
        } else if (usuarioInformacao.id_info == null || usuarioInformacao.id_info == "" || isNaN(usuarioInformacao.id_info) || usuarioInformacao.id_info <= 0) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "id_info"
            return mesagensDefault.ERRO_NOT_FOUND
        }  
        return true; 
    } catch (error) {
        return false;
    }
}

const validarUsuarioFamilia = (usuarioFamilia) => {
    try {
        if (usuarioFamilia.id_usuario == null || usuarioFamilia.id_usuario == "" || isNaN(usuarioFamilia.id_usuario) || usuarioFamilia.id_usuario <= 0) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "id_usuario"
            return mesagensDefault.ERRO_NOT_FOUND
        } else if (usuarioFamilia.id_familia == null || usuarioFamilia.id_familia == "" || isNaN(usuarioFamilia.id_familia) || usuarioFamilia.id_familia <= 0) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "id_familia"
            return mesagensDefault.ERRO_NOT_FOUND
        }  
        return true; 
    } catch (error) {
        return false;
    }
}

const validarUsuarioNotificacao = (usuarioNotificacao) => {
    try {
        if (usuarioNotificacao.id_usuario == null || usuarioNotificacao.id_usuario == "" || isNaN(usuarioNotificacao.id_usuario) || usuarioNotificacao.id_usuario <= 0) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "id_usuario"
            return mesagensDefault.ERRO_NOT_FOUND
        } else if (usuarioNotificacao.id_notificacao == null || usuarioNotificacao.id_notificacao == "" || isNaN(usuarioNotificacao.id_notificacao) || usuarioNotificacao.id_notificacao <= 0) {
            mesagensDefault.ERRO_NOT_FOUND.campo = "id_notificacao"
            return mesagensDefault.ERRO_NOT_FOUND
        }  
        return true; 
    } catch (error) {
        return false;
    }
}


module.exports = {
    validarDadosUsuario,
    validarDadosFamilia,
    validarDadosEvento,
    validarDadosItens,
    validarDadosLista,
    validarDadosInformacao,
    validarDadosFinancia,
    validarDadosNotificacao,
    validarDadosEndereco,
    validarUsuarioInformacao,
    validarUsuarioFamilia,
    validarUsuarioNotificacao
}