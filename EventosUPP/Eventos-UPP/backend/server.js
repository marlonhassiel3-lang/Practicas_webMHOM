const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 CONEXIÓN A MONGODB
mongoose.connect('mongodb+srv://Admin:AvisosUppadmin@cluster0.gxnhoto.mongodb.net/eventosDB?retryWrites=true&w=majority')
.then(() => console.log('Mongo conectado'))
.catch(err => console.log(err));

// 👉 RUTA DE EVENTOS (AGREGADA)
app.use('/api/eventos', require('./routes/eventos'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Servidor
app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});