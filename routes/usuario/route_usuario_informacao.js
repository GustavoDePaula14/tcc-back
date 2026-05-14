/***********************************************
 * Objetivo: Arquivo de responsavel pela manipulação de routas de usuario_informacao na API
 * Autor: Kauan Antunes
 * Data: 07/05/2026
 * Versão: 1.0
 ************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const controller = require('../../controller/usuario/controller_usuario_informacao')
const router = express.Router()

router.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    router.use(cors())
    next()
})

router.get("/usuarios-informacoes", cors(), async function(request, response) {
    let result = await controller.listarUsuarioInformacao()
    response.json(result)
})

router.get("/usuario-informacao/:id", cors(), async function(request, response) {
    let id = request.params.id
    let result = await controller.listarUsuarioInformacaoID(id)
    response.json(result)
})
router.delete("/usuario-informacao/:id", cors(), async function(request, response) {
    let id = request.params.id
    let result = await controller.excluirUsuarioInformacao(id)
    response.json(result)
})

router.post("/usuario-informacao", cors(), bodyParserJSON, async function(request, response) {
    console.log("BODY:", request.body)
    
    let dadosBody = request.body
    let contentType = request.headers["content-type"]

    let result = await controller.criarUsuarioInformacao(dadosBody, contentType)
    response.json(result)
})
router.put("/usuario-informacao/:id", cors(), bodyParserJSON, async function(request, response) {
    let id = request.params.id
    let dadosBody = request.body
    let contentType = request.headers["content-type"]

    let result = await controller.atualizarUsuarioInformacao(dadosBody, contentType, id)
    response.json(result)
})
module.exports = router;