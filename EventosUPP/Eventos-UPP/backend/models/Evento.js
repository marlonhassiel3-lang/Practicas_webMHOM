const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  fecha: Date,
  tipo: String
});

module.exports = mongoose.model('Evento', EventoSchema);