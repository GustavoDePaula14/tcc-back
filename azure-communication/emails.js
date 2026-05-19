const html = require('./htmlsEmails')

const criarMessageNovaSenha = function(to_email, remetente){
    const message = {
        senderAddress:"DoNotReply@c1c84fa9-5816-4316-9edd-ff82e6600114.azurecomm.net",
        content:{
            subject: "Troca de senha de usuario",
            plainText: "Troca de senha de usuario",
            html:html.joinFamilyHTML(remetente)
        },
        recipients: {
            to: [{ address: to_email }],
        },
    }
    return message
}
const criarMessageLoginUsuarioFamilia = function(to_email, remetente){
    const message = {
        senderAddress:"DoNotReply@c1c84fa9-5816-4316-9edd-ff82e6600114.azurecomm.net",
        content:{
            subject: "Troca de senha de usuario",
            plainText: "Troca de senha de usuario",
            html:html.joinFamilyHTML(remetente)
        },
        recipients: {
            to: [{ address: to_email }],
        },
    }
    return message
}
module.exports={
    criarMessageNovaSenha,
    criarMessageLoginUsuarioFamilia
}