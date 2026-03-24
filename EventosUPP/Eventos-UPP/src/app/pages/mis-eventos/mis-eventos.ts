import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventosService, Evento } from '../../services/eventos.service';

@Component({
  selector: 'app-mis-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-eventos.html',
  styleUrl: './mis-eventos.css',
})
export class MisEventos implements OnInit {
  eventos: Evento[] = [];
  cargando = true;
  error: string | null = null;

  constructor(private eventosService: EventosService) {}

  ngOnInit() {
    let profesorId = null;
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('adminUser');
      if (userStr) {
        const user = JSON.parse(userStr);
        profesorId = user._id;
      }
    }

    if (!profesorId) {
      this.error = 'No se encontró la sesión del profesor.';
      this.cargando = false;
      return;
    }

    this.eventosService.getMisEventos(profesorId).subscribe({
      next: (data) => {
        this.eventos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando los eventos', err);
        this.error = 'Hubo un error cargando tus eventos.';
        this.cargando = false;
      }
    });
  }

  eliminarEvento(evento: Evento) {
    if (!evento._id) return;
    if (!confirm(`¿Eliminar tu evento "${evento.titulo}" de la base de datos?`)) return;
    this.cargando = true;
    this.eventosService.eliminarEvento(evento._id).subscribe({
      next: () => this.ngOnInit(),
      error: () => {
        alert('Hubo un error al eliminar');
        this.cargando = false;
      }
    });
  }
}