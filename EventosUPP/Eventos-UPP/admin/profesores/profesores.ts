import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDataService } from '../../../services/admin-data.service';

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
      alert('Nombre, correo y contraseña son obligatorios');
      return;
    }
    
    this.cargando = true;
    const userPayload = { ...this.nuevoProfesor, activo: true };

    this.adminData.crearProfesor(userPayload).subscribe({
      next: () => {
        this.nuevoProfesor = { nombre: '', email: '', password: '', departamento: '', rol: 'PROFESOR' };
        this.mostrarFormulario = false;
        this.ngOnInit();
      },
      error: () => this.cargando = false
    });
  }

  eliminarProfesor(id: string, nombre: string) {
    if (!confirm(`¿Estás seguro de que deseas eliminar permanentemente a ${nombre} de la plataforma?`)) return;
    this.cargando = true;
    this.adminData.eliminarProfesor(id).subscribe({
      next: () => this.ngOnInit(),
      error: () => this.cargando = false
    });
  }
}
