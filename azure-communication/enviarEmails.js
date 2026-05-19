require('dotenv').config();

const { EmailClient } = require("@azure/communication-email");

const connectionString = process.env['COMMUNICATION_SERVICES_CONNECTION_STRING']

const client = new EmailClient(connectionString); 
const emails = require('./emails.js');

const enviarNovaSenha = async function(destinatario, remetente){
    const poller = await client.beginSend(emails.criarMessageNovaSenha(destinatario, remetente));
    const result = await poller.pollUntilDone();
    return true
}

const enviarLoginUsuarioFamila = async function(destinatario, remetente) {
    const poller = await client.beginSend(emails.criarMessageLoginUsuarioFamilia(destinatario, remetente));
    const result = await poller.pollUntilDone();
    return true
}

module.exports = {
    enviarLoginUsuarioFamila,
    enviarNovaSenha
};
