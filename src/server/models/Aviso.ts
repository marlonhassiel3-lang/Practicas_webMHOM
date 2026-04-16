import mongoose, { Document, Schema } from 'mongoose';

export interface IAviso extends Document {
  titulo: string;
  descripcion: string;
  etiquetaTexto?: string;
  etiquetaColor?: string;
  enlaceUrl?: string;
  creadoPor_id?: mongoose.Types.ObjectId;
  fechaPublicacion: Date;
}

const AvisoSchema: Schema = new Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  etiquetaTexto: { type: String },
  etiquetaColor: { type: String, default: 'bg-primary' },
  enlaceUrl: { type: String },
  creadoPor_id: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  fechaPublicacion: { type: Date, default: Date.now }
});

export default mongoose.model<IAviso>('Aviso', AvisoSchema, 'avisos');
