import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDataService } from '../../../services/admin-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-avisos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './avisos.html',
  styleUrl: './avisos.css',
})
export class Avisos implements OnInit {
  avisos: any[] = [];
  cargando = true;

  mostrarFormulario = false;
  avisoActual: any = { titulo: '', descripcion: '', etiquetaTexto: 'Aviso', etiquetaColor: 'bg-primary' };
  esEdicion = false;

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

  abrirFormularioCrear() {
    this.esEdicion = false;
    this.avisoActual = { titulo: '', descripcion: '', etiquetaTexto: 'Aviso', etiquetaColor: 'bg-primary' };
    this.mostrarFormulario = true;
  }

  cancelarFormulario() {
    this.mostrarFormulario = false;
  }

  guardarAviso() {
    if (!this.avisoActual.titulo || !this.avisoActual.descripcion) {
      Swal.fire('Campos requeridos', 'Por favor llena todos los campos.', 'warning');
      return;
    }
    if (this.avisoActual.titulo.length < 5 || this.avisoActual.titulo.length > 100) {
      Swal.fire('Título inválido', 'El título debe tener entre 5 y 100 caracteres.', 'warning');
      return;
    }
    if (this.avisoActual.descripcion.length < 20 || this.avisoActual.descripcion.length > 1000) {
      Swal.fire('Descripción corta', 'La descripción debe tener al menos 20 caracteres.', 'warning');
      return;
    }
    this.cargando = true;

    if (this.esEdicion) {
      fetch(`/api/avisos/${this.avisoActual._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.avisoActual)
      }).then(res => res.json()).then(() => {
        this.mostrarFormulario = false;
        this.ngOnInit();
      }).catch(err => {
        console.error(err);
        this.cargando = false;
      });
    } else {
      this.adminData.crearAviso(this.avisoActual).subscribe({
        next: () => {
          Swal.fire('¡Guardado!', 'Aviso publicado correctamente.', 'success');
          this.mostrarFormulario = false;
          this.ngOnInit();
        },
        error: () => {
          Swal.fire('Error', 'No se pudo guardar el aviso.', 'error');
          this.cargando = false;
        }
      });
    }
  }

  eliminarAviso(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cargando = true;
        this.adminData.eliminarAviso(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El aviso ha sido borrado.', 'success');
            this.ngOnInit();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el aviso.', 'error');
            this.cargando = false;
          }
        });
      }
    });
  }

  editarAviso(aviso: any) {
    this.esEdicion = true;
    this.avisoActual = { ...aviso };
    this.mostrarFormulario = true;
  }
}
