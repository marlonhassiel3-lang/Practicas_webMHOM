import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-evento',
  imports: [],
  templateUrl: './crear-evento.html',
  styleUrl: './crear-evento.css',
})
export class CrearEvento {
guardarEvento() {
  alert('Evento publicado correctamente (simulado)');
}
}
