const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: String, required: true },
    hora: { type: String, required: true },
    lugar: { type: String, required: true },
    organizador: { type: String, required: true },
    correoOrganizador: { type: String, required: true },
    categoria: { type: String, required: true },
    imagenBase64: { type: String, required: false },
    imagenMimeType: { type: String, required: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Evento', EventoSchema);