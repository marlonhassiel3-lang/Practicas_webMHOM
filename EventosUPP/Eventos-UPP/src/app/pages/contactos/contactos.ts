import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
    if (!this.form.nombre || !this.form.correo || !this.form.mensaje) return;
    this.enviando = true;

    const payload = {
      nombre: this.form.nombre,
      email: this.form.correo,
      mensaje: `[Mensaje para Organizador - Evento: ${this.evento?.titulo}] ${this.form.mensaje}`
    };

    this.http.post('/api/solicitudes', payload).subscribe({
      next: () => {
        this.enviado = true;
        this.enviando = false;
        setTimeout(() => {
          this.router.navigate(['/eventos']);
        }, 2500);
      },
      error: (err) => {
        console.error('Error enviando', err);
        this.enviando = false;
        alert('Hubo un error al enviar el mensaje.');
      }
    });
  }
}
