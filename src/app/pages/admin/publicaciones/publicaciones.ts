import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventosService, Evento } from '../../../services/eventos.service';
import { AdminAuthService } from '../../../services/admin-auth.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: '¿Publicar evento?',
      text: "El evento será visible para todos los estudiantes.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, publicar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cargando = true;
        this.eventosService.actualizarEstado(id, 'PUBLICADO').subscribe({
          next: () => {
            Swal.fire('¡Publicado!', 'El evento ahora es público.', 'success');
            this.ngOnInit();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo publicar el evento.', 'error');
            this.cargando = false;
          }
        });
      }
    });
  }

  eliminarEvento(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción borrará el evento definitivamente.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cargando = true;
        this.eventosService.eliminarEvento(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El evento ha sido borrado.', 'success');
            this.ngOnInit();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el evento.', 'error');
            this.cargando = false;
          }
        });
      }
    });
  }
}
