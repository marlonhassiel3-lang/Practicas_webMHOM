import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Games } from '../../services/alumnos';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tabla.html'
})
export class Tabla implements OnInit {

  listaGames: any[] = [];

  constructor(
    private games: Games,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarGames();
  }

  cargarGames() {
    this.games.obtenerGames()
      .subscribe(data => {
        this.listaGames = data;
        this.cdr.detectChanges(); // 👈 FORZAMOS ACTUALIZACIÓN
      });
  }

  eliminarGame(id: string) {
    this.games.eliminarGame(id)
      .subscribe(() => {
        alert("Juego eliminado");
        this.cargarGames();
      });
  }

  editarGame(game: any) {
    this.router.navigate(['/editar', game._id]);
  }
}