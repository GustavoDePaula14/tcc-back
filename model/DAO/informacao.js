/***********************************************
 * Objetivo: CRUD de informacao no banco
 * Autor: Kauan Antunes
 * Versão: 2.0 
 ************************************************/

const knex = require("knex")
const knexConfig = require("../../model/database_config/knexfile.js")

const knexDatabase = knex(knexConfig.development)

// GET ALL
const getAllInformations = async function () {
    try {
        let result = await knexDatabase("tb_informacao").select("*")

        return result.length > 0 ? result : false

    } catch (error) {
        console.log(error)
        return false
    }
}

// GET BY ID
const getInformationById = async function (id) {
    try {
        let result = await knexDatabase("tb_informacao")
            .where({ id_info: id })

        return result.length > 0 ? result : false

    } catch (error) {
        console.log(error)
        return false
    }
}

// INSERT
const setInsertInformation = async function (informacao) {
    try {
        let result = await knexDatabase("tb_informacao").insert({
            titulo: informacao.titulo,
            descricao: informacao.descricao
        })

        return result ? true : false

    } catch (error) {
        console.log(error)
        return false
    }
}

// UPDATE
const setUpdateInformation = async function (informacao) {
    try {
        let result = await knexDatabase("tb_informacao")
            .update({
                titulo: informacao.titulo,
                descricao: informacao.descricao
            })
            .where({ id_info: informacao.id_info })

        // result = quantidade de linhas afetadas
        return result > 0 ? true : false

    } catch (error) {
        console.log(error)
        return false
    }
}

// DELETE
const setDeleteInformation = async function (id) {
    try {
        let result = await knexDatabase("tb_informacao")
            .where({ id_info: id })
            .del()

        return result > 0 ? true : false

    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    getAllInformations,
    getInformationById,
    setInsertInformation,
    setUpdateInformation,
    setDeleteInformation
}