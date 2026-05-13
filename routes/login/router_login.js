/***********************************************
 * Objetivo: Arquivo de responsavel pela manipulação de routas de login na API
 * Autor: Gustavo de Paula Silva
 * Data: 07/05/2026
 * Versão: 1.0
 ************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const bodyParserJSON = bodyParser.json()
require('dotenv').config()


const controller = require('../../controller/login/controller_login.js')
const router = express.Router()

router.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    router.use(cors())
    next()
})

router.post("/login", cors(), bodyParserJSON, async function(request, response) {
    let dadosBody = request.body
    let contentType = request.headers["content-type"]

    let result = await controller.validarLogin(dadosBody, contentType)
    let usuarioReduzido = result.Response
    delete usuarioReduzido.senha
    let token = jwt.sign(usuarioReduzido, process.env.JWT_SECRETS, {expiresIn: '1h'})
    console.log(token)
    response.json(result)
})

module.exports = router;