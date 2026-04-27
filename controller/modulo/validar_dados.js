/***********************************************
 * Objetivo: Arquivo de responsavel pela validação de conteudo do body
 * Autor: Gustavo de Paula Silva
 * Data: 24/04/2026 & 27/04/2026
 * Versão: 1.0
 ************************************************/

const validarDadosUsuario = async function(usuario){
    try {
        if(usuario.nome == null || usuario.nome == "" || usuario.nome == undefined || usuario.nome.length > 100){
            return false
    
        }else if(usuario.cpf == null || usuario.cpf == "" || usuario.cpf == undefined || usuario.cpf.length > 14){
            return false
            
        }else if(usuario.data_nascimento == null || usuario.data_nascimento == "" || usuario.data_nascimento == undefined || usuario.data_nascimento.length > 14){
            return false
    
        }else if(usuario.senha == null || usuario.senha == "" || usuario.senha == undefined || usuario.senha.length > 100){
            return false
    
        }else if(usuario.email == null || usuario.email == "" || usuario.email == undefined || usuario.email.length > 100){
            return false
    
        }else if(usuario.is_admin == null || usuario.is_admin == undefined || usuario.is_admin != true || usuario.is_admin != false){
            return false
    
        }else{
            return true
        }
    } catch (error) {
        console.log(error)   
    }
}
const validarDadosFamilia = async function(familia) {
    try {
        if(familia.nome == null || familia.nome == "" || familia.nome == undefined || familia.nome.length > 100){
            return false
        }else if(familia.telefone_residencial == null || familia.telefone_residencial == "" || familia.telefone_residencial == undefined || familia.telefone_residencial.length > 100){
            return false
        }else{
            return true
        }
    } catch (error) {
        console.log(error)  
    }
}
const validarDadosEvento = async function(evento) {
    try {
        if(evento.titulo == null || evento.titulo == "" || evento.titulo == undefined || evento.titulo.length > 100){
            return false
        }else if(evento.descricao == null || evento.descricao == "" || evento.descricao == undefined || evento.descricao.length > 100){
            return false
        }else if(evento.data == null || evento.data == "" || evento.data == undefined || evento.data.length > 100){
            return false
        }else{
            return true
        }
    } catch (error) {
        console.log(error)
    }
}
const validarDadosItens = async function(item) {
    try{
        if(item.nome_item == null || item.nome_item == "" || item.nome_item == undefined || item.nome_item.length > 100){
            return false
        }else if(item.quantidade == null || item.quantidade == "" || item.quantidade == undefined || !isNaN(item.quantidade)){
            return false
        }else if(item.valor_unitario == null || item.valor_unitario == "" || item.valor_unitario == undefined || !isNaN(item.valor_unitario)){
            return false
        }else if(item.comprado == null || item.comprado == undefined || item.comprado != true || item.comprado != false){
            return false
        }else{
            return true
        }
    } catch(error){
        console.log(error)
    }
}
const validarDadosLista = async function(lista) {
    try {
        if(lista.nome_lista == null || lista.nome_lista == "" || lista.nome_lista == undefined || lista.nome_lista.length > 100){
            return false
        }else{
            return true
        }
    } catch (error) {
        console.log(error)  
    }
}
const validarDadosInformacao = async function(informacao) {
    try {
        if(informacao.titulo == null || informacao.titulo == "" || informacao.titulo == undefined || informacao.titulo.length > 100){
            return false
        }else if(informacao.descricao == null || informacao.descricao == "" || informacao.descricao == undefined || informacao.descricao.length > 100){
            return false
        }else{
            return true
        }
    } catch (error) {
        console.log(error)  
    }
}
const validarDadosFinancia = async function(financia) {
    try {
        if(financia.tipo == null || financia.tipo == "" || financia.tipo == undefined || financia.tipo.length > 100){
            return false
        }else if(financia.descricao == null || financia.descricao == "" || financia.descricao == undefined || financia.descricao.length > 100){
            return false
        }else if(financia.valor == null || financia.valor == "" || financia.valor == undefined || !isNaN(financia.valor)){
            return false
        }else if(financia.icone == null || financia.icone == "" || financia.icone == undefined || financia.icone.length > 100){
            return false
        }else{
            return true
        }
    } catch (error) {
        console.log(error)  
    }
}
const validarDadosNotificacao = async function(notificacao) {
    try {
        if(notificacao.titulo == null || notificacao.titulo == "" || notificacao.titulo == undefined || notificacao.titulo.length > 100){
            return false
        }else if(notificacao.descricao == null || notificacao.descricao == "" || notificacao.descricao == undefined || notificacao.descricao.length > 100){
            return false
        }else if(notificacao.data == null || notificacao.data == "" || notificacao.data == undefined || notificacao.data.length > 100){
            return false
        }else{
            return true
        }
    } catch (error) {
        console.log(error)  
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
    validarDadosNotificacao
}