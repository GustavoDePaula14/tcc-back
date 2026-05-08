/***********************************************
 * Objetivo: Arquivo de configuração do knex focado para Azure
 * Autor: Gustavo de Paula Silva
 * Data: 27/04/2026
 * Versão: 1.2
 ************************************************/

module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: "family-sync.mysql.database.azure.com", // O endpoint do Azure
            user: "familysync", // Ex: administrador
            password: "Senai@2026",
            database: "familysync",
            port: 3306,
            ssl: {
                rejectUnauthorized: true 
            }
        }
    }
};
