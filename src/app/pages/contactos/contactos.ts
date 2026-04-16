import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contactos.html',
  styleUrl: './contactos.css',
})
export class Contactos implements OnInit {
  evento: any = null;
  form = { nombre: '', correo: '', mensaje: '' };
  enviado = false;
  enviando = false;

  constructor(private router: Router, private http: HttpClient) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['evento']) {
      this.evento = navigation.extras.state['evento'];
    }
  }

  ngOnInit(): void {
    if (!this.evento) {
      // Fallback si no hay evento en el estado (por ejemplo, si refrezcan la página directamente)
      this.evento = { titulo: 'Evento general / No especificado', organizador_id: 'Coordinación de Eventos' };
    }
  }

  enviarMensaje() {
    if (!this.form.nombre || !this.form.correo || !this.form.mensaje) {
      Swal.fire('Campos requeridos', 'Por favor llena todos los datos de contacto.', 'warning');
      return;
    }
    
    if (this.form.mensaje.length < 20 || this.form.mensaje.length > 1000) {
      Swal.fire('Mensaje muy corto', 'Por favor escribe un mensaje de al menos 20 caracteres.', 'warning');
      return;
    }

    this.enviando = true;

    const payload: any = {
      nombre: this.form.nombre,
      email: this.form.correo,
      mensaje: `[Mensaje para Organizador - Evento: ${this.evento?.titulo}] ${this.form.mensaje}`
    };

    if (this.evento?.organizador_id) {
      payload.profesor_id = this.evento.organizador_id;
    }

    this.http.post('/api/solicitudes', payload).subscribe({
      next: () => {
        Swal.fire('¡Mensaje Enviado!', 'El organizador se pondrá en contacto pronto.', 'success');
        this.enviado = true;
        this.enviando = false;
        setTimeout(() => {
          this.router.navigate(['/eventos']);
        }, 3000);
      },
      error: (err) => {
        console.error('Error enviando', err);
        this.enviando = false;
        Swal.fire('Error', 'Hubo un error al enviar tu mensaje.', 'error');
      }
    });
  }
}
