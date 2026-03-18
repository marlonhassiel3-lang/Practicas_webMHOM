import { Component } from '@angular/core';

@Component({
  selector: 'app-contactos',
  imports: [],
  templateUrl: './contactos.html',
  styleUrl: './contactos.css',
})
export class Contactos {
enviarMensaje() {
  alert('Mensaje enviado correctamente (simulado)');
}
}
