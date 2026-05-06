const express = require('express');
const cors = require('cors');
const knex = require('knex');
const config = require('./model/database_config/knexfile');

const app = express();
const PORT = 3000;
const URL_BASE = '/v1/familysync'

const routerUsuario = require('./routes/usuario/route_usuario.js')
const routerFamilia = require('./routes/familia/route_familia.js')
const routerInformacao = require('./routes/informacao/informacao.js')
<<<<<<< HEAD
const routerItem = require('./routes/item/route_item.js')
=======
const routerEndereco = require('./routes/endereco/router_endereco.js')
const routerItem = require('./routes/item/route_item.js')
const routerLista = require('./routes/lista/route_lista.js')
>>>>>>> 43d22a2d71b0df34cebac99d9eb67f685c58415f

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

<<<<<<< HEAD
app.use('/v1/familysync', routerUsuario);
app.use('/v1/familysync', routerFamilia);
app.use('/v1/familysync', routerInformacao);
app.use('/v1/familysync', routerItem);
=======
app.use(URL_BASE, routerUsuario);
app.use(URL_BASE, routerFamilia);
app.use(URL_BASE, routerInformacao);
app.use(URL_BASE, routerEndereco);
app.use(URL_BASE, routerItem);
app.use(URL_BASE, routerLista)
>>>>>>> 43d22a2d71b0df34cebac99d9eb67f685c58415f

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});