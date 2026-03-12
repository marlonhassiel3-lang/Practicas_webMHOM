import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Eventos } from '../services/eventos';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './tabla.html',
  styleUrl: './tabla.css'
})
export class Tabla implements OnInit {

  listaEventos: any[] = [];

  constructor(private eventos: Eventos) {}

  ngOnInit() {
    this.eventos.obtenerEventos().subscribe(data => {
      this.listaEventos = data as any[];
    });
  }

}