import mongoose from 'mongoose';
import { connectDB } from './server/db/database';
import Usuario from './server/models/Usuario';
import Evento from './server/models/Evento';
import Aviso from './server/models/Aviso';
import Solicitud from './server/models/Solicitud';

const runSeed = async () => {
  try {
    // 1. Conectar a la base de datos
    await connectDB();
    console.log('🔌 Conectado a MongoDB...');

    // 2. Limpiar la base de datos
    console.log('🧹 Limpiando colecciones anteriores...');
    await Usuario.deleteMany({});
    await Evento.deleteMany({});
    await Aviso.deleteMany({});
    await Solicitud.deleteMany({});

    // 3. Crear Usuarios (1 Admin, 2 Profesores)
    console.log('👤 Creando usuarios...');
    const admin = await Usuario.create({
      nombre: 'Administrador General UPP',
      email: 'admin@upp.edu.mx',
      password: '123',
      rol: 'ADMIN',
      departamento: 'Sistemas',
      activo: true
    });

    const prof1 = await Usuario.create({
      nombre: 'Ing. Carlos Gómez Sánchez',
      email: 'cgomez@upp.edu.mx',
      password: '123',
      rol: 'PROFESOR',
      departamento: 'Mecatrónica',
      activo: true
    });

    const prof2 = await Usuario.create({
      nombre: 'Dra. Xóchitl Ruano Duarte',
      email: 'xruano@upp.edu.mx',
      password: '123',
      rol: 'PROFESOR',
      departamento: 'Ingeniería en Software',
      activo: true
    });

    // 4. Crear Eventos asignados a los profesores
    console.log('📅 Creando eventos y vinculando organizadores...');
    await Evento.create({
      titulo: 'Hackathon Universitario 2026',
      descripcion: 'Competencia ininterrumpida de desarrollo de 24 horas. ¡Ven con tu equipo y desarrolla la solución del mañana! Habrá premios, comida y mentores. Cupo limitado.',
      fecha: '2026-10-15',
      ubicacion: 'Auditorio Principal',
      imagen: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200',
      estado: 'PUBLICADO',
      cupoMaximo: 80,
      organizador_id: prof2._id, // Referencia al profesor
      categoria: 'Conferencias'
    });

    await Evento.create({
      titulo: 'Taller de Brazo Robótico e IoT',
      descripcion: 'Aprende a ensamblar y programar brazos robóticos usando C++ y conectarlos a la nube. Requisito: Laptop con Arduino IDE preinstalado.',
      fecha: '2026-05-20',
      ubicacion: 'Edificio H, Laboratorio 3',
      imagen: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200',
      estado: 'PUBLICADO',
      cupoMaximo: 25,
      organizador_id: prof1._id,
      categoria: 'Talleres'
    });

    await Evento.create({
      titulo: 'Torneo Intramuros de eSports',
      descripcion: 'Torneo universitario de videojuegos. Categorías de Super Smash Bros y League of Legends. Inscríbete vía formulario.',
      fecha: '2026-11-03',
      ubicacion: 'Cafetería Central',
      imagen: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1400',
      estado: 'REVISION', // No se verá en el listado público hasta que el admin lo publique
      cupoMaximo: 120,
      organizador_id: prof1._id,
      categoria: 'Deportes'
    });

    // 5. Crear Avisos
    console.log('📢 Creando avisos institucionales...');
    await Aviso.create({
      titulo: 'Suspensión de labores académicas',
      descripcion: 'Por disposición oficial, el próximo lunes se suspenden todas las actividades. Retomamos clases el martes.',
      etiquetaTexto: 'IMPORTANTE',
      etiquetaColor: 'bg-danger',
    });

    await Aviso.create({
      titulo: 'Apertura de Convocatoria de Becas',
      descripcion: 'Se ha abierto la recepción de documentos para la Beca de Excelencia. Sube tus constancias al portal.',
      etiquetaTexto: 'ACADÉMICO',
      etiquetaColor: 'bg-primary',
    });

    // 6. Crear Solicitudes (Mensajes de Contacto recibidos)
    console.log('📩 Creando solicitudes (bandeja de mensajes)...');
    await Solicitud.create({
      nombre: 'Ana Pérez',
      email: 'ana.perez@alumnos.upp.edu.mx',
      estado: 'NUEVO',
      mensaje: '[Mensaje para Organizador - Evento: Taller de Brazo Robótico e IoT] Hola profesor, ¿Tengo que llevar los compontentes o la universidad los presta?'
    });

    await Solicitud.create({
      nombre: 'Luis Manuel',
      email: 'luis.manuel@gmail.com',
      estado: 'LEIDO',
      mensaje: '[Otras dudas] Me gustaría ofrecer un patrocinio para el Hackathon. ¿Con quién me dirijo de forma oficial?'
    });

    console.log('✅ BASE DE DATOS INICIALIZADA CORRECTAMENTE');
    console.log('============================================');
    console.log('👨‍💻 Puedes iniciar sesión con:');
    console.log('Admin -> admin@upp.edu.mx | Pass: 123');
    console.log('Prof  -> xruano@upp.edu.mx | Pass: 123');

  } catch (error) {
    console.error('❌ Error inyectando datos:', error);
  } finally {
    mongoose.connection.close();
  }
};

runSeed();
