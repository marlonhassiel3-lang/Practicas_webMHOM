import mongoose from 'mongoose';

/**
 * PREPARACIÓN PARA MONGODB COMPASS (Localhost)
 * ===========================================
 * 
 * NOTA: Antes de utilizar este archivo, debes instalar Mongoose en tu proyecto:
 * 1. Abre tu terminal.
 * 2. Ejecuta el comando: npm install mongoose
 * 3. Ejecuta el comando: npm install -D @types/mongoose
 * 
 * Mongoose es la biblioteca (ODM) que nos permite conectar nuestra aplicación
 * Node.js (Express/Angular SSR) con nuestra base de datos MongoDB.
 */

const MONGO_URI = process.env['MONGO_URI'] || 'mongodb+srv://admin:MiPassword123@eventosupp.npezjyq.mongodb.net/eventosUPP?appName=EventosUPP';

let cachedDb: typeof mongoose | null = null;

export const connectDB = async () => {
    if (cachedDb) return cachedDb;
    try {
        const conn = await mongoose.connect(MONGO_URI);
        cachedDb = conn;
        console.log(`✅ MongoDB Conectado exitosamente: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`❌ Error de conexión a MongoDB:`, error);
        if (!process.env['NETLIFY']) {
            process.exit(1);
        }
        throw error;
    }
};
