import mongoose, { Document, Schema } from 'mongoose';

export interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string; // En producción iría encriptada (Ej: bcrypt)
    rol: string;
    departamento: string;
    fechaRegistro: Date;
    activo: boolean;
}

const UsuarioSchema: Schema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, default: 'ADMIN' },
    departamento: { type: String },
    fechaRegistro: { type: Date, default: Date.now },
    activo: { type: Boolean, default: true }
});

export default mongoose.model<IUsuario>('Usuario', UsuarioSchema);
