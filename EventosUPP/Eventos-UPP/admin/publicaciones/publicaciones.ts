import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventosService, Evento } from '../../../services/eventos.service';
import { AdminAuthService } from '../../../services/admin-auth.service';

@Component({
  selector: 'app-publicaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publicaciones.html',
  styleUrl: './publicaciones.css',
})
export class Publicaciones implements OnInit {
  eventos: Evento[] = [];
  cargando = true;

  constructor(private eventosService: EventosService, public auth: AdminAuthService) {}

  ngOnInit() {
    this.eventosService.getEventos().subscribe({
      next: (data) => {
        this.eventos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando los eventos', err);
        this.cargando = false;
      }
    });
  }

  aprobarEvento(id: string) {
    if (!confirm('¿Seguro quieres hacer público este evento?')) return;
    this.cargando = true;
    this.eventosService.actualizarEstado(id, 'PUBLICADO').subscribe({
      next: () => this.ngOnInit(),
      error: () => this.cargando = false
    });
  }

  eliminarEvento(id: string) {
    if (!confirm('¿Estás totalmente seguro de borrar esta publicación?')) return;
    this.cargando = true;
    this.eventosService.eliminarEvento(id).subscribe({
      next: () => this.ngOnInit(),
      error: () => this.cargando = false
    });
  }
}
