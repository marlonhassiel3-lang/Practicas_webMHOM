const express = require('express');
const multer = require('multer');
const Evento = require('../models/Evento');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', async (req, res) => {
  try {
    const eventos = await Evento.find().sort({ createdAt: -1 }).lean();

    const eventosConImagen = eventos.map((evento) => ({
      ...evento,
      imagenSrc: evento.imagenBase64
        ? `data:${evento.imagenMimeType};base64,${evento.imagenBase64}`
        : ''
    }));

    res.json(eventosConImagen);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener eventos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id).lean();

    if (!evento) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.json({
      ...evento,
      imagenSrc: evento.imagenBase64
        ? `data:${evento.imagenMimeType};base64,${evento.imagenBase64}`
        : ''
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el evento' });
  }
});

router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      fecha,
      hora,
      lugar,
      organizador,
      correoOrganizador,
      categoria
    } = req.body;

    const nuevoEvento = new Evento({
      nombre,
      descripcion,
      fecha,
      hora,
      lugar,
      organizador,
      correoOrganizador,
      categoria,
      imagenBase64: req.file ? req.file.buffer.toString('base64') : '',
      imagenMimeType: req.file ? req.file.mimetype : ''
    });

    await nuevoEvento.save();

    res.status(201).json({
      ...nuevoEvento.toObject(),
      imagenSrc: nuevoEvento.imagenBase64
        ? `data:${nuevoEvento.imagenMimeType};base64,${nuevoEvento.imagenBase64}`
        : ''
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el evento' });
  }
});

router.put('/:id', upload.single('imagen'), async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      fecha,
      hora,
      lugar,
      organizador,
      correoOrganizador,
      categoria
    } = req.body;

    const actualizacion = {
      nombre,
      descripcion,
      fecha,
      hora,
      lugar,
      organizador,
      correoOrganizador,
      categoria
    };

    if (req.file) {
      actualizacion.imagenBase64 = req.file.buffer.toString('base64');
      actualizacion.imagenMimeType = req.file.mimetype;
    }

    const eventoActualizado = await Evento.findByIdAndUpdate(
      req.params.id,
      actualizacion,
      { new: true }
    ).lean();

    if (!eventoActualizado) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.json({
      ...eventoActualizado,
      imagenSrc: eventoActualizado.imagenBase64
        ? `data:${eventoActualizado.imagenMimeType};base64,${eventoActualizado.imagenBase64}`
        : ''
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el evento' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Evento.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el evento' });
  }
});

module.exports = router;