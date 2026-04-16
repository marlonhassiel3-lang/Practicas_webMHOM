import mongoose, { Document, Schema } from 'mongoose';

export interface ISolicitud extends Document {
  nombre: string;
  email: string;
  estado: string; // 'NUEVO', 'PENDIENTE', 'RESUELTO'
  mensaje: string;
  fecha: Date;
  profesor_id?: string;
}

const SolicitudSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  estado: { type: String, default: 'NUEVO' },
  mensaje: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  profesor_id: { type: String, required: false }
});

export default mongoose.model<ISolicitud>('Solicitud', SolicitudSchema, 'solicitudes');
