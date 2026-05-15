const criarMessageNovaSenha = function(to_email){
    const message = {
        senderAddress:"DoNotReply@<from_domain>",
        content:{
            subject: "Troca de senha de usuario",
            plainText: "Troca de senha de usuario",
            html:`
                <html>
                    <body>
                        <h1>
                            Aperte esse botao para atualizar sua senha
                        </h1>
                    </body>
                </html>`
        },
        recipients: {
            to: [{ address: `${to_email}` }],
        },
    }
    return message
}
const criarMessageLoginUsuarioFamilia = function(to_email){
    const message = {
        senderAddress:"DoNotReply@<from_domain>",
        content:{
            subject: "",
            plainText: "",
            html:`
                <html>
                    <body>
                        <h1>
                            Aperte esse botão para entrar na familia
                        </h1>
                    </body>
                </html>`
        },
        recipients: {
            to: [{ address: `${to_email}` }],
        },
    }
    return message
}
module.exports={
    criarMessageNovaSenha,
    criarMessageLoginUsuarioFamilia
}