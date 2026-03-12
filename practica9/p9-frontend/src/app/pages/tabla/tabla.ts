import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Alumnos } from '../../services/alumnos';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.html'
})
export class Tabla implements OnInit {

  listaAlumnos: any[] = [];

  constructor(
  private alumnos: Alumnos,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit() {
  this.alumnos.obtenerAlumnos()
    .subscribe((data: any[]) => {
      this.listaAlumnos = data;
      this.cdr.detectChanges();
    });
}
}