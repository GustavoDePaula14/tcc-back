/***********************************************
 * Objetivo: Arquivo responsavel pelo UPLOAD de arquivos na API
 * Autor: Gustavo de Paula Silva
 * Data: 25/05/2026
 * Versão: 1.1 
 ************************************************/

const { response } = require('express')

const fetch = require('node-fetch').default
require('dotenv').config()

const AZURE = {
    ACCOUNT: process.env.AZURE_STORAGE_ACCOUNT,
    CONTAINER: process.env.AZURE_STORAGE_CONTAINER,
    TOKEN: process.env.AZURE_STORAGE_SAS_TOKEN
}

const uploadFiles = async function (file) {
    // console.log(file)
    if (!file || !file.mimetype || !file.size) return null
    // console.log(file)
    let allowedFileTypes = ['JPG', 'PNG', 'JPEG']
    let mimeType = String(file.mimetype).split('/')[1].toUpperCase()
    console.log(mimeType)
    let lengthFile = Number(file.size) / 1024 

    if (allowedFileTypes.indexOf(mimeType)) {
        let fileName = Date.now() + '-' + file.originalname
        console.log(fileName)
        let urlFile = `https://${AZURE.ACCOUNT}.blob.core.windows.net/${AZURE.CONTAINER}/${fileName}`
        console.log(urlFile)
        let urlFileToken = `${urlFile}?${AZURE.TOKEN}`
        console.log(urlFileToken)

        try {
            let response = await fetch(urlFileToken, {
                method: 'PUT',
                headers: {
                    'x-ms-blob-type': 'BlockBlob',
                    'Content-Type': file.mimetype
                },
                body: file.buffer
            })
            console.log(response)

            if (response.status == 201) {
                return urlFile
            } else {
                return false
            }
        } catch (error) {
            console.error("Erro ao enviar para o Azure:", error)
            return false
        }
    } else {
        return false
    }
}

module.exports = { uploadFiles }