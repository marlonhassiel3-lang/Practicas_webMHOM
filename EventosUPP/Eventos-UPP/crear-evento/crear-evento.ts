import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

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
  error: string | null = null;

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

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<any[]>('/api/profesores').subscribe({
      next: (data) => {
        // Solo mostrar usuarios con rol PROFESOR
        this.profesores = data.filter(u => u.rol === 'PROFESOR');
      },
      error: () => console.error('Error cargando profesores')
    });
  }

  guardarEvento() {
    if (!this.evento.titulo || !this.evento.descripcion || !this.evento.fecha || !this.evento.organizador_id) {
      this.error = 'Por favor completa los campos obligatorios: título, descripción, fecha y organizador.';
      return;
    }
    this.error = null;
    this.cargando = true;
    this.http.post('/api/eventos', this.evento).subscribe({
      next: () => {
        this.cargando = false;
        this.enviado = true;
        setTimeout(() => this.router.navigate(['/profesor']), 2000);
      },
      error: (err) => {
        this.cargando = false;
        this.error = err.error?.error || 'Error al publicar el evento';
      }
    });
  }
}
