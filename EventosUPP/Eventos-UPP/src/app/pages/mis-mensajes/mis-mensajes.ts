import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mis-mensajes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-mensajes.html',
  styleUrl: './mis-mensajes.css',
})
export class MisMensajes implements OnInit {
  mensajes: any[] = [];
  cargando = true;
  error: string | null = null;
  profesorId: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('adminUser');
      if (userStr) {
        const user = JSON.parse(userStr);
        this.profesorId = user._id;
      }
    }

    if (!this.profesorId) {
      this.error = 'No se encontró la sesión del profesor.';
      this.cargando = false;
      return;
    }

    this.cargarMensajes();
  }

  cargarMensajes() {
    this.cargando = true;
    this.http.get<any[]>(`/api/solicitudes/profesor/${this.profesorId}`).subscribe({
      next: (data) => {
        this.mensajes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando mensajes', err);
        this.error = 'Error cargando los mensajes.';
        this.cargando = false;
      }
    });
  }

  marcarLeidos() {
    if (!this.profesorId) return;
    this.cargando = true;
    this.http.put('/api/solicitudes/leidas', { profesor_id: this.profesorId }).subscribe({
      next: () => this.cargarMensajes(),
      error: () => this.cargando = false
    });
  }

  responder(mensaje: any) {
    window.location.href = `mailto:${mensaje.email}?subject=Respuesta a tu duda sobre evento&body=Hola ${mensaje.nombre},%0D%0A%0D%0A`;
  }
}