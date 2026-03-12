import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Games } from '../../services/alumnos';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar.html'
})
export class Editar implements OnInit {

  id: string = '';

  game = {
    nombre: '',
    genero: '',
    precio: 0,
    imagenUrl: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private games: Games
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.games.obtenerGames()
      .subscribe(data => {
        const juego = data.find(g => g._id === this.id);
        if (juego) {
          this.game = juego;
        }
      });
  }

 actualizarGame() {

  const gameActualizado = {
    nombre: this.game.nombre,
    genero: this.game.genero,
    precio: this.game.precio,
    imagenUrl: this.game.imagenUrl
  };

  this.games.actualizarGame(this.id, gameActualizado)
    .subscribe(() => {
      alert("Juego actualizado correctamente");
      this.router.navigate(['/games']);
    });
}
}