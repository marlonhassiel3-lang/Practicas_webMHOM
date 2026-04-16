import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDataService } from '../../../services/admin-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitudes.html',
  styleUrl: './solicitudes.css',
})
export class Solicitudes implements OnInit {
  solicitudes: any[] = [];
  cargando = true;

  constructor(private adminData: AdminDataService, private http: HttpClient) {}

  ngOnInit() {
    this.adminData.getSolicitudes().subscribe({
      next: (data) => {
        this.solicitudes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando solicitudes', err);
        this.cargando = false;
      }
    });
  }

  eliminarSolicitud(id: string) {
    if (!confirm('¿Deseas archivar y eliminar esta solicitud?')) return;
    this.cargando = true;
    this.adminData.eliminarSolicitud(id).subscribe({
      next: () => this.ngOnInit(),
      error: () => this.cargando = false
    });
  }

  marcarTodasLeidas() {
    this.cargando = true;
    this.http.put('/api/solicitudes/leidas', {}).subscribe({
      next: () => this.ngOnInit(),
      error: () => this.cargando = false
    });
  }

  responder(solicitud: any) {
    // Abre el cliente de correo predeterminado
    window.location.href = `mailto:${solicitud.email}?subject=Respuesta a tu solicitud: ${solicitud.asunto || 'Información de eventos'}&body=Hola ${solicitud.nombre},%0D%0A%0D%0A`;
  }
}
