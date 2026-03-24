import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDataService } from '../../../services/admin-data.service';

@Component({
  selector: 'app-avisos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avisos.html',
  styleUrl: './avisos.css',
})
export class Avisos implements OnInit {
  avisos: any[] = [];
  cargando = true;

  constructor(private adminData: AdminDataService) {}

  ngOnInit() {
    this.adminData.getAvisos().subscribe({
      next: (data) => {
        this.avisos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando avisos', err);
        this.cargando = false;
      }
    });
  }

  crearAviso() {
    const titulo = prompt('Título del nuevo aviso (Ej: Suspensión de clases):');
    if (!titulo) return;
    const descripcion = prompt('Descripción / Mensaje largo del aviso:');
    if (!descripcion) return;

    this.cargando = true;
    const avisoBase = { titulo, descripcion, etiquetaTexto: 'Nuevo', etiquetaColor: 'bg-info' };
    this.adminData.crearAviso(avisoBase).subscribe({
      next: () => this.ngOnInit(),
      error: () => this.cargando = false
    });
  }

  eliminarAviso(id: string) {
    if (!confirm('¿Estás seguro de que quieres eliminar definitivamente este aviso?')) return;
    this.cargando = true;
    this.adminData.eliminarAviso(id).subscribe({
      next: () => this.ngOnInit(),
      error: () => this.cargando = false
    });
  }

  editarAviso(aviso: any) {
    const titulo = prompt('Nuevo título del aviso:', aviso.titulo);
    if (!titulo) return;
    const descripcion = prompt('Nueva descripción:', aviso.descripcion);
    if (!descripcion) return;

    this.cargando = true;
    // Puesto que usamos window.fetch para que sea mas rápido, aquí llamamos a raw fetch or HttpClient (si estuviera).
    // AdminDataService no tiene editar, usamos fetch rapido.
    fetch(`/api/avisos/${aviso._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, descripcion })
    }).then(res => res.json()).then(() => {
      this.ngOnInit();
    }).catch(err => {
      console.error(err);
      this.cargando = false;
    });
  }
}
