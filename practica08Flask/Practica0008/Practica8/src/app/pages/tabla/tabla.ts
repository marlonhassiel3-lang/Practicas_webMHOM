import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Eventos } from '../../services/eventos';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.html',
})
export class Tabla implements OnInit {

  listaEventos: any[] = [];

  constructor(private eventos: Eventos) {}

  ngOnInit() {
    this.eventos.obtenerEventos()
      .subscribe(data => {
        this.listaEventos = data as any[];
        console.log(this.listaEventos);
      });
  }
}