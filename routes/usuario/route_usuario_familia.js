/***********************************************
 * Objetivo: Arquivo de responsavel pela manipulação de routas de usuario_familia na API
 * Autor: Kauan Antunes
 * Data: 11/05/2026
 * Versão: 1.0
 ************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const controller = require('../../controller/usuario/controller_usuario_familia')
const router = express.Router()

router.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    router.use(cors())
    next()
})

router.get("/usuarios-familia", cors(), async function(request, response) {
    let result = await controller.listarUsuarioFamilia()
    response.json(result)
})

router.get("/usuario-familia/:id", cors(), async function(request, response) {
    let id = request.params.id
    let result = await controller.listarUsuarioFamiliaID(id)
    response.json(result)
})
router.delete("/usuario-familia/:id", cors(), async function(request, response) {
    let id = request.params.id
    let result = await controller.excluirUsuarioFamilia(id)
    response.json(result)
})

router.post("/usuario-familia", cors(), bodyParserJSON, async function(request, response) {
    console.log("BODY:", request.body)
    
    let dadosBody = request.body
    let contentType = request.headers["content-type"]

    let result = await controller.criarUsuarioFamilia(dadosBody, contentType)
    response.json(result)
})
router.put("/usuario-familia/:id", cors(), async function(request, response) {
    let id = request.params.id
    let dadosBody = request.body
    let contentType = request.headers["content-type"]

    let result = await controller.atualizarUsuarioFamilia(dadosBody, contentType, id)
    response.json(result)
})
module.exports = router;