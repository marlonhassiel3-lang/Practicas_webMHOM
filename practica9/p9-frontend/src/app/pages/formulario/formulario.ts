import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Alumnos } from '../../services/alumnos';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.html'
})
export class Formulario {

  constructor(private alumnos: Alumnos) {}

  guardarAlumno(form: any) {

    if (form.invalid) return;

    const nuevoAlumno = {
      nombre: form.value.nombre,
      edad: form.value.edad,
      carrera: form.value.carrera
    };

    this.alumnos.agregarAlumno(nuevoAlumno)
      .subscribe(() => {
        alert("Alumno agregado correctamente");
        form.reset();
      });
  }
}