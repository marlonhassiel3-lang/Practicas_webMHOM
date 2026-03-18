import { Component } from '@angular/core';

@Component({
  selector: 'app-mis-eventos',
  imports: [],
  templateUrl: './mis-eventos.html',
  styleUrl: './mis-eventos.css',
})
export class MisEventos {

  eventos = [
    {
      nombre: 'Taller de Angular',
      fecha: '2026-04-10',
      lugar: 'Laboratorio 3',
      organizador: 'Xóchitl Ruano Duarte'
    },
    {
      nombre: 'Conferencia de IA',
      fecha: '2026-05-15',
      lugar: 'Auditorio',
      organizador: 'Xóchitl Ruano Duarte'
    }
  ];

  eliminarEvento(index: number) {
    this.eventos.splice(index, 1);
    alert('Evento eliminado');
  }

}