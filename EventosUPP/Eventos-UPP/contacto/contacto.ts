import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
    if (!this.form.nombre || !this.form.correo || !this.form.mensaje) return;
    this.enviando = true;
    
    // Combine subject and message
    const payload = {
      nombre: this.form.nombre,
      email: this.form.correo,
      mensaje: (this.form.asunto ? `[${this.form.asunto}] ` : '') + this.form.mensaje
    };

    this.http.post('/api/solicitudes', payload).subscribe({
      next: () => {
        this.enviado = true;
        this.enviando = false;
        this.form = { nombre: '', correo: '', asunto: '', mensaje: '' };
      },
      error: (err) => {
        console.error('Error enviando mensaje', err);
        this.enviando = false;
        alert('Hubo un error al enviar el mensaje. Intenta nuevamente.');
      }
    });
  }
}
