import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-evento.html',
  styleUrl: './crear-evento.css',
})
export class CrearEvento implements OnInit {
  profesores: any[] = [];
  cargando = false;
  enviado = false;
  minDate: string = '';

  evento = {
    titulo: '',
    descripcion: '',
    fecha: '',
    ubicacion: '',
    imagen: '',
    cupoMaximo: 50,
    organizador_id: '',
    categoria: '',
    estado: 'REVISION'
  };

  constructor(private http: HttpClient, private router: Router, public auth: AdminAuthService) {}

  ngOnInit() {
    // Calcular fecha mínima (hoy) para el campo de fecha HTML
    const hoy = new Date();
    this.minDate = hoy.toISOString().split('T')[0];

    // Auto-asignar si es profesor
    const currentUser = this.auth.getUserData();
    if (currentUser && currentUser.rol === 'PROFESOR') {
      this.evento.organizador_id = currentUser._id;
    }

    // Cargar profesores para que un Admin pueda seleccionarlos
    if (this.auth.isAdmin()) {
      this.http.get<any[]>('/api/profesores').subscribe({
        next: (data) => {
          this.profesores = data.filter(u => u.rol === 'PROFESOR');
        },
        error: () => console.error('Error cargando profesores')
      });
    }
  }

  guardarEvento() {
    // Validaciones
    if (!this.evento.titulo || !this.evento.descripcion || !this.evento.fecha || !this.evento.organizador_id) {
      Swal.fire('Campos requeridos', 'Por favor completa todos los campos obligatorios.', 'warning');
      return;
    }
    
    if (this.evento.titulo.length < 5 || this.evento.titulo.length > 100) {
      Swal.fire('Título inválido', 'El nombre del evento debe tener entre 5 y 100 caracteres.', 'warning');
      return;
    }
    
    if (this.evento.descripcion.length < 20 || this.evento.descripcion.length > 1000) {
      Swal.fire('Descripción corta', 'La descripción debe tener al menos 20 caracteres.', 'warning');
      return;
    }

    if (this.evento.fecha < this.minDate) {
      Swal.fire('Fecha inválida', 'El evento no puede registrarse en una fecha pasada.', 'warning');
      return;
    }

    this.cargando = true;
    this.http.post('/api/eventos', this.evento).subscribe({
      next: () => {
        this.cargando = false;
        this.enviado = true;
        Swal.fire('¡Éxito!', 'Evento enviado para revisión.', 'success');
        setTimeout(() => this.router.navigate(['/profesor']), 2000);
      },
      error: (err) => {
        this.cargando = false;
        Swal.fire('Error', err.error?.error || 'Error al publicar el evento', 'error');
      }
    });
  }
}
