import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * PREPARACIÓN DE LA BASE DE DATOS MONGODB
 * =======================================
 * 1. Descomenta la siguiente importación cuando hayas instalado mongoose
 *    y tengas el archivo database.ts listo.
 */
import { connectDB } from './server/db/database';

/**
 * 2. Descomenta la siguiente línea para inicializar la conexión a MongoDB 
 *    cada vez que arranques tu servidor.
 */
connectDB();

import Evento from './server/models/Evento';
import Usuario from './server/models/Usuario';
import Aviso from './server/models/Aviso';
import Solicitud from './server/models/Solicitud';

// Habilitar el procesamiento de request body JSON (Necesario para POST login)
app.use(express.json());

/**
 * Express Rest API endpoints
 */
app.get('/api/eventos', async (req, res) => {
  try {
    const eventos = await Evento.find().lean();
    res.json(eventos);
  } catch (error) {
    console.error('Error al recuperar eventos', error);
    res.status(500).json({ error: 'Error recabando eventos de base de datos' });
  }
});

app.get('/api/admin/stats', async (req, res) => {
  try {
    const totalUsuarios = await Usuario.countDocuments();
    const totalEventos = await Evento.countDocuments();
    const totalAvisos = await Aviso.countDocuments();
    const totalSolicitudes = await Solicitud.countDocuments();
    
    res.json({
      usuarios: totalUsuarios,
      eventos: totalEventos,
      avisos: totalAvisos,
      solicitudes: totalSolicitudes
    });
  } catch (error) {
    console.error('Error generando estadisticas', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/avisos', async (req, res) => {
  try {
    const avisos = await Aviso.find().sort({ fechaPublicacion: -1 }).lean();
    res.json(avisos);
  } catch (error) {
    res.status(500).json({ error: 'Error cargando avisos' });
  }
});

app.post('/api/avisos', async (req, res) => {
  try {
    const nuevo = new Aviso(req.body);
    await nuevo.save();
    res.json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear aviso' });
  }
});

app.delete('/api/avisos/:id', async (req, res) => {
  try {
    await Aviso.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar aviso' });
  }
});

app.get('/api/profesores', async (req, res) => {
  try {
    const profesores = await Usuario.find().select('-password').lean();
    res.json(profesores);
  } catch (error) {
    res.status(500).json({ error: 'Error cargando profesores' });
  }
});

app.post('/api/profesores', async (req, res) => {
  try {
    const nuevo = new Usuario(req.body);
    await nuevo.save();
    res.json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear profesor' });
  }
});

app.delete('/api/profesores/:id', async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar profesor' });
  }
});

app.get('/api/solicitudes', async (req, res) => {
  try {
    const solicitudes = await Solicitud.find().sort({ fecha: -1 }).lean();
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ error: 'Error cargando solicitudes' });
  }
});

app.get('/api/profesor/:id/eventos', async (req, res) => {
  try {
    const eventos = await Evento.find({ organizador_id: req.params.id }).sort({ createdAt: -1 }).lean();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Error cargando eventos del profesor' });
  }
});

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ error: 'El administrador no fue encontrado' });
    }
    
    // Comparación simple en texto plano (como se guardó en la MongoShell script)
    if (usuario.password !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    
    if (!usuario.activo) {
      return res.status(403).json({ error: 'La cuenta se encuentra inactiva' });
    }

    return res.json({
      message: 'Login exitoso',
      token: 'token-jwt-simulado-1234567890', 
      user: { nombre: usuario.nombre, email: usuario.email, rol: usuario.rol }
    });
  } catch (error) {
    console.error('Error en el login', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id'] || process.argv.includes('--api')) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://127.0.0.1:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
