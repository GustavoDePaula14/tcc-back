/***********************************************
 * Objetivo: Arquivo responsavel pelo UPLOAD de arquivos na API
 * Autor: Gustavo de Paula Silva
 * Data: 25/05/2026
 * Versão: 1.0
 ************************************************/

const AZURE = ""
const fetch = require('node-fetch').default

const uploadFiles = async function (file) {
    let allowedFileTypes = ['JPG', 'PNG', 'JPEG']
    let mineType = String(file.minetype).split('/')[1].toUpperCase()
    let lengthFile = Number(file.size) / 1024

    // let urlFile = `https://${AZURE.ACCOUNT}.blob.core.windows.net/${AZURE.CONTAINER}/${fileName}`
}