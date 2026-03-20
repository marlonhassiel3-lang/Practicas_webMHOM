const express = require('express');
const router = express.Router();
const Evento = require('../models/Evento');

// Crear evento
router.post('/', async (req, res) => {
  const nuevo = new Evento(req.body);
  await nuevo.save();
  res.json(nuevo);
});

// Obtener eventos
router.get('/', async (req, res) => {
  const eventos = await Evento.find();
  res.json(eventos);
});

module.exports = router;