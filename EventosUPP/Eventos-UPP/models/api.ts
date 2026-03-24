import express from 'express';
import { connectDB } from './server/db/database';
import Evento from './server/models/Evento';
import Usuario from './server/models/Usuario';
import Aviso from './server/models/Aviso';
import Solicitud from './server/models/Solicitud';

const app = express();
app.use(express.json());

connectDB();

app.get('/api/eventos', async (req, res) => {
  try {
    const eventos = await Evento.find().lean();
    const usuarios = await Usuario.find().lean();
    const userMap = new Map(usuarios.map(u => [String(u._id), u.nombre]));
    
    const eventosConOrg = eventos.map(e => ({
      ...e,
      organizador_nombre: e.organizador_id ? (userMap.get(String(e.organizador_id)) || 'Coordinación') : 'Coordinación'
    }));
    
    res.json(eventosConOrg);
  } catch (error) {
    res.status(500).json({ error: 'Error recabando eventos de base de datos' });
  }
});

app.post('/api/eventos', async (req, res) => {
  try {
    const nuevo = new Evento(req.body);
    await nuevo.save();
    res.json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear evento' });
  }
});

app.get('/api/eventos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`[GET /api/eventos/:id] Buscando id="${id}"`);
    
    let evento: any = null;
    
    // Intentar con ObjectId
    try {
      evento = await Evento.findById(id).lean();
    } catch (_) {
      // ID no es un ObjectId válido, intentar como string
    }
    
    // Si no encontró, buscar con _id como string
    if (!evento) {
      evento = await (Evento as any).findOne({ _id: id }).lean();
    }
    
    console.log(`[GET /api/eventos/:id] Resultado:`, evento ? 'ENCONTRADO' : 'NO ENCONTRADO');
    
    if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });
    
    if (evento.organizador_id) {
      try {
        const user = await Usuario.findById(evento.organizador_id).lean();
        evento.organizador_nombre = user ? user.nombre : 'Coordinación';
      } catch(e) {
        evento.organizador_nombre = 'Coordinación';
      }
    } else {
      evento.organizador_nombre = 'Coordinación';
    }

    return res.json(evento);
  } catch (error) {
    console.error('[GET /api/eventos/:id] Error:', error);
    return res.status(500).json({ error: 'Error interno', detail: String(error) });
  }
});

app.get('/api/admin/stats', async (req, res) => {
  try {
    const totalUsuarios = await Usuario.countDocuments();
    const totalEventos = await Evento.countDocuments();
    const totalAvisos = await Aviso.countDocuments();
    const totalSolicitudes = await Solicitud.countDocuments();
    res.json({ usuarios: totalUsuarios, eventos: totalEventos, avisos: totalAvisos, solicitudes: totalSolicitudes });
  } catch (error) {
    res.status(500).json({ error: 'Error interno' });
  }
});

app.get('/api/avisos', async (req, res) => {
  try {
    const avisos = await Aviso.find().sort({ fechaPublicacion: -1 }).lean();
    res.json(avisos);
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
});

app.post('/api/avisos', async (req, res) => {
  try {
    const nuevo = new Aviso(req.body);
    await nuevo.save();
    res.json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear' });
  }
});

app.delete('/api/avisos/:id', async (req, res) => {
  try {
    await Aviso.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
});

app.put('/api/avisos/:id', async (req, res) => {
  try {
    const aviso = await Aviso.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(aviso);
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
});

app.get('/api/profesores', async (req, res) => {
  try {
    const profesores = await Usuario.find().select('-password');
    res.json(profesores);
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
});

app.post('/api/profesores', async (req, res) => {
  try {
    const nuevo = new Usuario(req.body);
    await nuevo.save();
    res.json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
});

app.delete('/api/profesores/:id', async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
});

app.get('/api/solicitudes', async (req, res) => {
  try {
    const solicitudes = await Solicitud.find().sort({ fecha: -1 });
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
});

app.post('/api/solicitudes', async (req, res) => {
  try {
    const nueva = new Solicitud(req.body);
    await nueva.save();
    res.json(nueva);
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar solicitud' });
  }
});

app.put('/api/solicitudes/leidas', async (req, res) => {
  try {
    // Marcar todas las solicitudes 'NUEVO' como 'RESUELTO' o 'LEIDO'
    await Solicitud.updateMany({ estado: 'NUEVO' }, { estado: 'LEIDO' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando solicitudes' });
  }
});

app.delete('/api/solicitudes/:id', async (req, res) => {
  try {
    await Solicitud.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
});

app.get('/api/profesor/:id/eventos', async (req, res) => {
  try {
    const eventos = await Evento.find({ organizador_id: req.params.id }).sort({ createdAt: -1 });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
});

app.delete('/api/eventos/:id', async (req, res) => {
  try {
    await Evento.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
});

app.put('/api/eventos/:id/estado', async (req, res) => {
  try {
    const ev = await Evento.findByIdAndUpdate(req.params.id, { estado: req.body.estado }, { new: true });
    res.json(ev);
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
});

app.post('/api/admin/login', async (req, res): Promise<any> => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(401).json({ error: 'Usuario no encontrado' });
    if (usuario.password !== password) return res.status(401).json({ error: 'Contraseña incorrecta' });
    if (!usuario.activo) return res.status(403).json({ error: 'Cuenta inactiva' });
    
    return res.json({
      message: 'OK',
      token: 'jwt-123',
      user: { _id: String(usuario._id), nombre: usuario.nombre, email: usuario.email, rol: usuario.rol }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error' });
  }
});

// Arrancar este app aisladamente de Angular
const port = 4000;
app.listen(port, () => {
  console.log(`Backend API pura escuchando en http://127.0.0.1:${port}`);
});
