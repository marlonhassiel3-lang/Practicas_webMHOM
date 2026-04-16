import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDataService } from '../../../services/admin-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profesores.html',
  styleUrl: './profesores.css',
})
export class Profesores implements OnInit {
  profesores: any[] = [];
  cargando = true;
  mostrarFormulario = false;
  nuevoProfesor = { nombre: '', email: '', password: '', departamento: '', rol: 'PROFESOR' };

  constructor(private adminData: AdminDataService) {}

  ngOnInit() {
    this.adminData.getProfesores().subscribe({
      next: (data) => {
        this.profesores = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando profesores', err);
        this.cargando = false;
      }
    });
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  guardarProfesor() {
    if (!this.nuevoProfesor.nombre || !this.nuevoProfesor.email || !this.nuevoProfesor.password) {
      Swal.fire('Campos requeridos', 'Nombre, correo y contraseña son obligatorios', 'warning');
      return;
    }
    
    this.cargando = true;
    const userPayload = { ...this.nuevoProfesor, activo: true };

    this.adminData.crearProfesor(userPayload).subscribe({
      next: () => {
        Swal.fire('¡Éxito!', 'Usuario registrado correctamente.', 'success');
        this.nuevoProfesor = { nombre: '', email: '', password: '', departamento: '', rol: 'PROFESOR' };
        this.mostrarFormulario = false;
        this.ngOnInit();
      },
      error: () => {
        Swal.fire('Error', 'No se pudo crear el usuario', 'error');
        this.cargando = false;
      }
    });
  }

  eliminarProfesor(id: string, nombre: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Eliminar permanentemente a ${nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cargando = true;
        this.adminData.eliminarProfesor(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El usuario ha sido dado de baja.', 'success');
            this.ngOnInit();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar al usuario.', 'error');
            this.cargando = false;
          }
        });
      }
    });
  }
}
