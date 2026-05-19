require('dotenv').config();

const { EmailClient } = require("@azure/communication-email");

const connectionString = process.env['COMMUNICATION_SERVICES_CONNECTION_STRING']

const client = new EmailClient(connectionString); 
const emails = require('./emails.js');

const enviarNovaSenha = async function(destinatario){
    const poller = await client.beginSend(emails.criarMessageNovaSenha(destinatario));
    const result = await poller.pollUntilDone();
}

const enviarLoginUsuarioFamila = async function(destinatario) {
    const poller = await client.beginSend(emails.criarMessageLoginUsuarioFamilia(destinatario));
    const result = await poller.pollUntilDone();
}

module.exports = {
    enviarLoginUsuarioFamila,
    enviarNovaSenha
};
