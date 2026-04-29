const express = require('express');
const cors = require('cors');
const knex = require('knex');
const config = require('./model/database_config/knexfile');

const app = express();
const PORT = 3000;

const db = knex(config.development);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend FamilySync rodando');
});

app.get('/teste-banco', async (req, res) => {
  try {
    await db.raw('SELECT 1');
    res.json({ message: 'Conexão com MySQL OK' });
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao conectar no banco',
      error: error.message
    });
  }
});

app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await db('tb_usuario').select('*');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao buscar usuários',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});