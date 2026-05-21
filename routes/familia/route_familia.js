/***********************************************
 * Objetivo: Arquivo de responsavel pela manipulação de routas de familia na API
 * Autor: Gustavo de Paula Silva
 * Data: 27/04/2026
 * Versão: 1.0
 ************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const controller = require('../../controller/familia/controller_familia.js')
const router = express.Router()

router.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    router.use(cors())
    next()
})

router.get("/familias", cors(), async function(request, response) {
    let result = await controller.listarFamilias()
    response.json(result)
})

router.get("/familia/:id", cors(), async function(request, response) {
    let id = request.params.id
    let result = await controller.listarFamiliaID(id)
    response.json(result)
})
router.delete("/familia/:id", cors(), async function(request, response) {
    let id = request.params.id
    let result = await controller.excluirFamilia(id)
    response.json(result)
})
router.post("/familia/endereco", cors(), bodyParserJSON, async function(request, response) {
    let dadosBody = request.body
    let contentType = request.headers["content-type"]

    let result = await controller.criarFamiliaEndereco(dadosBody,contentType)
    response.json(result)
})

router.post("/familia", cors(), bodyParserJSON, async function(request, response) {
    let dadosBody = request.body
    let contentType = request.headers["content-type"]

    let result = await controller.criarFamilia(dadosBody, contentType)
    response.json(result)
})
router.put("/familia/:id", cors(), async function(request, response) {
    let id = request.params.id
    let dadosBody = request.body
    let contentType = request.headers["content-type"]

    let result = await controller.atulizarFamilia(dadosBody, contentType, id)
    response.json(result)
})
module.exports = router;