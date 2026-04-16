import mongoose, { Document, Schema } from 'mongoose';

export interface IEvento extends Document {
    titulo: string;
    descripcion: string;
    fecha: string;
    ubicacion?: string;
    imagen?: string;
    estado?: string;
    cupoMaximo?: number;
    organizador_id?: any;
    categoria?: string;
}

const EventoSchema: Schema = new Schema({
    titulo: { type: String, trim: true },
    descripcion: { type: String },
    fecha: { type: String },
    ubicacion: { type: String },
    imagen: { type: String },
    estado: { type: String, default: 'REVISION' },
    cupoMaximo: { type: Number },
    organizador_id: { type: Schema.Types.Mixed },
    categoria: { type: String }
}, {
    timestamps: true,
    strict: false   // Permite campos adicionales insertados directamente en MongoDB
});

export default mongoose.model<IEvento>('Evento', EventoSchema);
