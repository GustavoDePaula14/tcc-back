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
    if(arrayAllowTypes.indexOf(mineType) != -1 && lengthFile.toFixed(1) <= 5000){
        let fileName = Date.now() + file.originalname
        let urlFile = `https://${AZURE.ACCOUNT}.blob.core.windows.net/${AZURE.CONTAINER}/${fileName}`
        let urlFileToken = `${urlFile}?${ZURE.TOKEN}`

        let response = await fetch(urlFileToken, {
            method: 'PUT',
            headers: {
                'x-ms-blob-type': 'BlockBlob',
                'Content-Type': 'application/octet-stream'
            },
            body: file.buffer
        })
        if(response.status == 201)
            return urlFile
        else
            return false
    }else{
        return false
    }
}

module.exports = {uploadFiles}