const express = require('express');
const cors = require('cors');
const knex = require('knex');
const config = require('./model/database_config/knexfile');

const app = express();
const PORT = 3000;

const routerUsuario = require('./routes/usuario/route_usuario.js')
const routerFamilia = require('./routes/familia/route_familia.js')
const routerInformacao = require('./routes/informacao/informacao.js')
const routerItem = require('./routes/item/route_item.js')

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

app.use('/v1/familysync', routerUsuario);
app.use('/v1/familysync', routerFamilia);
app.use('/v1/familysync', routerInformacao);
app.use('/v1/familysync', routerItem);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});