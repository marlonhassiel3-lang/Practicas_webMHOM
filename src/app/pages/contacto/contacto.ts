import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {
  form = { nombre: '', correo: '', asunto: '', mensaje: '' };
  enviado = false;
  enviando = false;

  constructor(private http: HttpClient) {}

  enviar() {
    if (!this.form.nombre || !this.form.correo || !this.form.mensaje) {
      Swal.fire('Campos incompletos', 'Por favor llena todos los campos marcados como requeridos.', 'warning');
      return;
    }

    if (this.form.mensaje.length < 20 || this.form.mensaje.length > 1000) {
      Swal.fire('Mensaje muy corto', 'Por favor escribe un mensaje de al menos 20 caracteres.', 'warning');
      return;
    }

    this.enviando = true;
    
    // Combine subject and message
    const payload = {
      nombre: this.form.nombre,
      email: this.form.correo,
      mensaje: (this.form.asunto ? `[${this.form.asunto}] ` : '') + this.form.mensaje
    };

    this.http.post('/api/solicitudes', payload).subscribe({
      next: () => {
        Swal.fire('¡Mensaje Enviado!', 'Nos pondremos en contacto contigo a la brevedad posible.', 'success');
        this.enviado = true;
        this.enviando = false;
        this.form = { nombre: '', correo: '', asunto: '', mensaje: '' };
      },
      error: (err) => {
        console.error('Error enviando mensaje', err);
        this.enviando = false;
        Swal.fire('Error', 'Hubo un error al enviar tu mensaje. Intenta nuevamente.', 'error');
      }
    });
  }
}
