import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Games } from '../../services/alumnos';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.html'
})
export class Formulario {

  game = {
    nombre: '',
    genero: '',
    precio: 0,
    imagenUrl: ''
  };

  constructor(
    private games: Games,
    private router: Router
  ) {}

  guardarGame() {
    this.games.agregarGame(this.game)
      .subscribe(() => {
        alert("Juego agregado correctamente");
        this.router.navigate(['/games']);
      });
  }
}