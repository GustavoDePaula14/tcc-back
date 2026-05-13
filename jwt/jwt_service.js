const jwt = require('jsonwebtoken');
require('dotenv').config()

const getToken = (usuario) => {
    return jwt.sign(usuario, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const getDecodedToken = (token) => {
    return jwt.decode(token);
};

const verificarToken = function(request, response, next) {
const authHeader = request.headers['authorization'];

    // Validar se o header existe e segue o padrão "Bearer <token>"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.status(401).json({ 
            status: false, 
            message: 'Acesso negado. Token não fornecido ou formato inválido.' 
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return response.status(403).json({ 
                    status: false, 
                    message: 'Token inválido ou expirado.' 
                });
            }

            // Injetar os dados decodificados no request para uso nas rotas
            request.user = decoded;
            next();
        });
    } catch (err) {
        return response.status(500).json({ 
            status: false, 
            message: 'Erro interno ao processar a autenticação.' 
        });
    }
}

module.exports={
    getToken,
    getDecodedToken,
    verificarToken
}